"""
BudgetAssist — Locust Performans / Yük Testi
=============================================

Kurulum:
  pip install locust

Çalıştırma (interaktif web arayüzü):
  locust -f locustfile.py --host=https://xfmbxqkowwoyxxunylhr.supabase.co

Çalıştırma (headless, 10 kullanıcı, 60 saniye):
  locust -f locustfile.py --host=https://xfmbxqkowwoyxxunylhr.supabase.co \\
         --headless -u 10 -r 2 --run-time 60s \\
         --html docs/locust-report.html

Ayarlar:
  SUPABASE_ANON_KEY  → Supabase anon key (JWT formatında, eyJ ile başlayan)
  SUPABASE_URL       → Proje URL'i

Not: Edge Function'lar JWT doğrulaması gerektirir.
     Gerçek kullanıcı JWT token'ı almak için önce Supabase Auth endpoint'ini
     çağırarak access_token alınmalıdır.
"""

import os
import json
import time
from locust import HttpUser, task, between, events


def load_dotenv_local():
    """Basit .env.local okuyucu; mevcut ortam değişkenlerini ezmez."""
    if not os.path.exists(".env.local"):
        return
    with open(".env.local", "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key, value.strip("\"'"))


load_dotenv_local()

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://xfmbxqkowwoyxxunylhr.supabase.co")
ANON_KEY = os.getenv("SUPABASE_ANON_KEY") or os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY", "")

# Test için geçici kullanıcı bilgileri (env'den al)
TEST_EMAIL = os.getenv("SELENIUM_TEST_EMAIL", "")
TEST_PASSWORD = os.getenv("SELENIUM_TEST_PASSWORD", "")


def get_auth_token(client):
    """Supabase Auth'tan JWT access_token alır."""
    resp = client.post(
        "/auth/v1/token?grant_type=password",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
        headers={
            "apikey": ANON_KEY,
            "Content-Type": "application/json",
        },
        name="/auth/v1/token (login)",
        catch_response=True,
    )
    if resp.status_code == 200:
        data = resp.json()
        return data.get("access_token", "")
    resp.failure(f"Login başarısız: {resp.status_code}")
    return ""


# ── Kullanıcı Sınıfları ────────────────────────────────────────────────────────

class AnonymousUser(HttpUser):
    """
    Giriş yapmamış kullanıcı davranışı.
    Landing page + CORS preflight yükü simülasyonu.
    """

    wait_time = between(1, 3)
    weight = 3  # Toplam trafiğin %60'ı

    def on_start(self):
        self.headers = {
            "Origin": "http://localhost:5173",
            "Content-Type": "application/json",
        }

    @task(3)
    def options_ai_coach(self):
        """CORS preflight — ai-coach"""
        self.client.options(
            "/functions/v1/ai-coach",
            headers={**self.headers, "Access-Control-Request-Method": "POST"},
            name="/functions/v1/ai-coach [OPTIONS]",
        )

    @task(2)
    def options_receipt_scanner(self):
        """CORS preflight — receipt-scanner"""
        self.client.options(
            "/functions/v1/receipt-scanner",
            headers={**self.headers, "Access-Control-Request-Method": "POST"},
            name="/functions/v1/receipt-scanner [OPTIONS]",
        )

    @task(2)
    def options_send_notifications(self):
        """CORS preflight — send-notifications"""
        self.client.options(
            "/functions/v1/send-notifications",
            headers={**self.headers, "Access-Control-Request-Method": "POST"},
            name="/functions/v1/send-notifications [OPTIONS]",
        )

    @task(1)
    def health_check(self):
        """Anonim REST erişim koruması — 401 beklenen ve başarılı kabul edilir."""
        with self.client.get(
            "/rest/v1/",
            headers={"apikey": ANON_KEY or "test"},
            name="/rest/v1/ [anon guard]",
            catch_response=True,
        ) as resp:
            if resp.status_code in (200, 401):
                resp.success()
            else:
                resp.failure(f"HTTP {resp.status_code}")


class AuthenticatedUser(HttpUser):
    """
    Giriş yapmış kullanıcı davranışı.
    AI Coach, Edge Function ve REST API çağrıları.
    """

    wait_time = between(2, 5)
    weight = 2  # Toplam trafiğin %40'ı

    def on_start(self):
        self.access_token = ""
        self.auth_headers = {}

        if TEST_EMAIL and TEST_PASSWORD and ANON_KEY:
            self.access_token = get_auth_token(self.client)
            if self.access_token:
                self.auth_headers = {
                    "Authorization": f"Bearer {self.access_token}",
                    "apikey": ANON_KEY,
                    "Content-Type": "application/json",
                    "Origin": "http://localhost:5173",
                }

    @task(4)
    def call_ai_coach(self):
        """AI Coach POST isteği — gerçek yük testi"""
        if not self.auth_headers:
            return

        payload = {
            "message": "Bu ay en çok hangi kategoriye harcama yaptım?",
            "summary": {
                "totalIncome": 8500,
                "totalExpenses": 6200,
                "netCashFlow": 2300,
                "categories": [
                    {"name": "Market", "spent": 1800, "budget": 1500},
                    {"name": "Ulaşım", "spent": 400, "budget": 500},
                ],
            },
        }

        with self.client.post(
            "/functions/v1/ai-coach",
            json=payload,
            headers=self.auth_headers,
            name="/functions/v1/ai-coach [POST]",
            catch_response=True,
        ) as resp:
            if resp.status_code == 200:
                data = resp.json()
                if "reply" not in data:
                    resp.failure("Yanıtta 'reply' alanı yok")
            elif resp.status_code == 429:
                resp.failure("Rate limit aşıldı")
            else:
                resp.failure(f"HTTP {resp.status_code}")

    @task(2)
    def call_send_notifications(self):
        """Send Notifications POST isteği"""
        if not self.auth_headers:
            return

        with self.client.post(
            "/functions/v1/send-notifications",
            json={"type": "alert"},
            headers=self.auth_headers,
            name="/functions/v1/send-notifications [POST]",
            catch_response=True,
        ) as resp:
            if resp.status_code in (200, 204):
                resp.success()
            else:
                resp.failure(f"HTTP {resp.status_code}")

    @task(1)
    def get_user_profile(self):
        """Supabase REST API — kullanıcı profili çekme"""
        if not self.auth_headers:
            return

        with self.client.get(
            "/rest/v1/profiles?select=*&limit=1",
            headers=self.auth_headers,
            name="/rest/v1/profiles [GET]",
            catch_response=True,
        ) as resp:
            if resp.status_code == 200:
                resp.success()
            else:
                resp.failure(f"HTTP {resp.status_code}")

    @task(1)
    def get_transactions(self):
        """Supabase REST API — son 20 işlem"""
        if not self.auth_headers:
            return

        with self.client.get(
            "/rest/v1/transactions?select=*&order=transaction_date.desc&limit=20",
            headers=self.auth_headers,
            name="/rest/v1/transactions [GET]",
            catch_response=True,
        ) as resp:
            if resp.status_code == 200:
                resp.success()
            else:
                resp.failure(f"HTTP {resp.status_code}")


# ── Olay dinleyicileri ─────────────────────────────────────────────────────────

@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    print("\n" + "=" * 60)
    print("  BudgetAssist — Locust Yük Testi Başladı")
    print(f"  Host: {SUPABASE_URL}")
    print(f"  Auth: {'✅ JWT alınacak' if TEST_EMAIL else '⚠️  SELENIUM_TEST_EMAIL ayarlanmamış (sadece anonim testler)'}")
    print("=" * 60 + "\n")


@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    stats = environment.stats.total
    print("\n" + "=" * 60)
    print("  Locust Test Özeti")
    print(f"  Toplam istek : {stats.num_requests}")
    print(f"  Başarısız    : {stats.num_failures}")
    print(f"  Ort. süre    : {stats.avg_response_time:.0f} ms")
    print(f"  95. yüzdelik : {stats.get_response_time_percentile(0.95):.0f} ms")
    print(f"  RPS          : {stats.current_rps:.1f}")
    print("=" * 60 + "\n")
