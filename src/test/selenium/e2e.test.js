/**
 * BudgetAssist — Selenium E2E Testleri
 *
 * Gereksinimler:
 *   - Dev server çalışıyor: npm run dev  (http://localhost:5173)
 *   - Chrome + ChromeDriver kurulu (aynı sürüm olmalı)
 *   - Gerçek test kullanıcısı .env.local'de tanımlı:
 *       SELENIUM_TEST_EMAIL=test@example.com
 *       SELENIUM_TEST_PASSWORD=testpassword123
 *
 * Çalıştırma:
 *   node src/test/selenium/e2e.test.js
 *
 * Uygulama akışı:
 *   LandingPage (/) → "Giriş Yap" butonu → FullApp → AuthScreen (email/şifre formu)
 *   → Başarılı giriş → Dashboard (Header sidebar ile navigasyon)
 *   → Account sayfası → "↪ Çıkış Yap" → AuthScreen
 */

import fs from "node:fs"
import { Builder, By, until } from "selenium-webdriver"
import chrome from "selenium-webdriver/chrome.js"

function loadDotEnvLocal() {
  if (!fs.existsSync(".env.local")) return
  const lines = fs.readFileSync(".env.local", "utf8").split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue
    const [key, ...parts] = trimmed.split("=")
    if (process.env[key]) continue
    process.env[key] = parts.join("=").replace(/^["']|["']$/g, "")
  }
}

loadDotEnvLocal()

const BASE_URL = process.env.SELENIUM_BASE_URL || "http://localhost:5173"
const TEST_EMAIL = process.env.SELENIUM_TEST_EMAIL || ""
const TEST_PASSWORD = process.env.SELENIUM_TEST_PASSWORD || ""
const TIMEOUT = 20000

// ── Yardımcı fonksiyonlar ──────────────────────────────────────────────────────

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function log(status, id, name, detail = "") {
  const icon = status === "GEÇTI" ? "✅" : status === "KALDI" ? "❌" : "⏭️ "
  console.log(`  ${icon} ${status.padEnd(6)} | ${id.padEnd(10)} | ${name}${detail ? ` — ${detail}` : ""}`)
}

async function waitForElement(driver, locator, timeout = TIMEOUT) {
  return driver.wait(until.elementLocated(locator), timeout)
}

async function waitForVisible(driver, locator, timeout = TIMEOUT) {
  const el = await waitForElement(driver, locator, timeout)
  await driver.wait(until.elementIsVisible(el), timeout)
  return el
}

/**
 * LandingPage'den AuthScreen'e geçiş sağlar.
 * Uygulama "/" yolunda LandingPage gösteriyor; AuthScreen ancak
 * "Giriş Yap" butonuna tıklayınca React state üzerinden yükleniyor.
 */
async function goToAuthPage(driver) {
  await driver.get(BASE_URL)
  await sleep(1500)

  // Daha önce zaten AuthScreen'deyse (e-posta inputu varsa) direkt dön
  const existing = await driver.findElements(By.css("input[type='email']"))
  if (existing.length > 0) return

  // LandingPage'deki "Giriş Yap" butonunu bul ve tıkla
  // Desktop nav: className="public-link-button"
  // Hero section: inline style button
  const loginBtns = await driver.findElements(
    By.xpath("//button[normalize-space(.)='Giriş Yap']")
  )
  if (loginBtns.length === 0) throw new Error("LandingPage'de 'Giriş Yap' butonu bulunamadı")

  // Görünür olan ilk butonu tıkla
  let clicked = false
  for (const btn of loginBtns) {
    try {
      const visible = await btn.isDisplayed()
      if (visible) {
        await btn.click()
        clicked = true
        break
      }
    } catch { /* skip */ }
  }
  if (!clicked) throw new Error("'Giriş Yap' butonu tıklanamadı")

  // AuthScreen'in yüklenmesini bekle (email input görünür olmalı)
  await driver.wait(until.elementLocated(By.css("input[type='email']")), TIMEOUT)
  await sleep(500)
}

// ── Test senaryoları ───────────────────────────────────────────────────────────

async function tcPageLoads(driver) {
  await driver.get(BASE_URL)
  await sleep(2000)
  const readyState = await driver.executeScript("return document.readyState")
  if (readyState !== "complete") throw new Error(`Sayfa yüklenmedi: readyState=${readyState}`)
}

async function tcInvalidLogin(driver) {
  // Önce AuthScreen'e geç (LandingPage → "Giriş Yap" → AuthScreen)
  await goToAuthPage(driver)

  const emailInput = await waitForElement(driver, By.css("input[type='email']"))
  await emailInput.clear()
  await emailInput.sendKeys("invalid@test.com")

  const passInput = await waitForElement(driver, By.css("input[type='password']"))
  await passInput.clear()
  await passInput.sendKeys("wrongpassword999")

  const submitBtn = await waitForElement(driver, By.css("button[type='submit']"))
  await submitBtn.click()
  await sleep(3500)

  // Hata mesajı görünüyor mu? (auth2-alert-error sınıfı veya hata içerikleri)
  const errorEls = await driver.findElements(
    By.xpath("//*[contains(@class,'error') or contains(@class,'alert') or contains(text(),'geçersiz') or contains(text(),'Geçersiz') or contains(text(),'Invalid') or contains(text(),'hata')]")
  )
  if (errorEls.length === 0) {
    // Hâlâ login formundaysa da kabul et — başarısız giriş = yönlendirme yok
    const emailInputsAfter = await driver.findElements(By.css("input[type='email']"))
    if (emailInputsAfter.length === 0) {
      throw new Error("Yanlış şifreyle giriş başarılı oldu (güvenlik hatası!)")
    }
  }
}

async function tc03_login(driver) {
  // Her seferinde temiz bir başlangıç: LandingPage → AuthScreen
  await goToAuthPage(driver)

  const emailInput = await waitForElement(driver, By.css("input[type='email']"))
  await emailInput.clear()
  await emailInput.sendKeys(TEST_EMAIL)

  const passInput = await waitForElement(driver, By.css("input[type='password']"))
  await passInput.clear()
  await passInput.sendKeys(TEST_PASSWORD)

  const submitBtn = await waitForElement(driver, By.css("button[type='submit']"))
  await submitBtn.click()

  // Supabase auth tamamlanana kadar bekle — dashboard yüklenecek
  await sleep(3000)

  // Giriş başarılıysa AuthScreen kaybolmuş, dashboard görünüyor olmalı
  const emailInputsAfter = await driver.findElements(By.css("input[type='email']"))
  if (emailInputsAfter.length > 0) {
    // Hata mesajı var mı?
    const errorEls = await driver.findElements(By.css(".auth2-alert-error"))
    const errorText = errorEls.length > 0 ? await errorEls[0].getText() : ""
    throw new Error(`Giriş başarısız${errorText ? `: ${errorText}` : " — kimlik bilgileri reddedildi"}`)
  }
}

async function tcDashboardVisible(driver) {
  // Dashboard: nav sidebar veya ana içerik alanı görünmeli
  const el = await waitForVisible(driver, By.css("header.luminous-sidebar, nav.luminous-nav, [data-testid='dashboard'], main"), TIMEOUT)
  if (!el) throw new Error("Dashboard görünmüyor")
}

async function tcNavigateTransactions(driver) {
  // Sidebar içindeki "İşlemler" nav butonuna tıkla
  const btn = await waitForVisible(
    driver,
    By.xpath("//button[contains(@class,'luminous-nav-button') and contains(.,'İşlemler')]"),
    TIMEOUT
  )
  await btn.click()
  await sleep(1500)

  // İşlemler sayfasına geçildi mi? (sayfa içeriği değişmeli)
  const txContent = await driver.findElements(
    By.xpath("//*[contains(text(),'İşlemler') or contains(text(),'Transactions') or contains(@class,'transaction')]")
  )
  if (txContent.length === 0) throw new Error("İşlemler sayfası içeriği yüklenmedi")
}

async function tcNavigateAiCoach(driver) {
  // Sidebar'da "AI Koç" nav butonuna tıkla
  const btn = await waitForVisible(
    driver,
    By.xpath("//button[contains(@class,'luminous-nav-button') and (contains(.,'AI') or contains(.,'Koç') or contains(.,'Coach'))]"),
    TIMEOUT
  )
  await btn.click()
  await sleep(1500)

  // AI Koç sayfası içeriği görünmeli
  const heading = await driver.findElements(
    By.xpath("//*[contains(text(),'AI') or contains(text(),'Koç') or contains(text(),'Coach')]")
  )
  if (heading.length === 0) throw new Error("AI Koç sayfası yüklenmedi")
}

async function tcAdminRedirect(driver) {
  // Normal kullanıcıyla /admin erişimi engellenmeli (hash routing)
  await driver.get(`${BASE_URL}#/admin`)
  await sleep(2000)

  const adminContent = await driver.findElements(
    By.xpath("//*[contains(text(),'Kullanıcı Yönetimi') or contains(text(),'Audit Log')]")
  )
  if (adminContent.length > 0) {
    throw new Error("Normal kullanıcı admin paneline erişebildi!")
  }
}

async function tc05_logout(driver) {
  // TC-30 sonrası sayfa reload oldu; session restore ve FullApp render'ı için bekle
  const profileBtn = await waitForElement(driver, By.css("button.sidebar-profile"), TIMEOUT)

  // JavaScript ile tıkla — olası interactability sorunlarını önler
  await driver.executeScript("arguments[0].scrollIntoView({block:'center'})", profileBtn)
  await sleep(300)
  await driver.executeScript("arguments[0].click()", profileBtn)

  // Account lazy component'inin DOM'a girmesini bekle
  await waitForElement(driver, By.css("div.account-page"), TIMEOUT)
  await sleep(1000)

  // Sayfayı en alta kaydır; account-bottom-actions section genellikle fold altındadır
  await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)")
  await sleep(500)

  // JavaScript ile "Çıkış" içeren butonu bul ve tıkla
  // (↪ unicode karakteri XPath string karşılaştırmasında sorun çıkarabiliyor)
  const signedOut = await driver.executeScript(`
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Çıkış'));
    if (btn) { btn.click(); return true; }
    return false;
  `)

  if (!signedOut) {
    throw new Error("'Çıkış Yap' butonu account sayfasında bulunamadı")
  }

  await sleep(2500)

  // signOut → FullApp !user → AuthScreen (email input) ya da LandingPage
  const emailInputs = await driver.findElements(By.css("input[type='email']"))
  if (emailInputs.length === 0) {
    const loginBtns = await driver.findElements(By.xpath("//button[normalize-space(.)='Giriş Yap']"))
    if (loginBtns.length === 0) {
      throw new Error("Çıkış sonrası giriş ekranına yönlendirilmedi")
    }
  }
}

// ── Test runner ────────────────────────────────────────────────────────────────

const results = []

async function runTest(id, name, fn, driver) {
  try {
    await fn(driver)
    log("GEÇTI", id, name)
    results.push({ id, name, status: "GEÇTI" })
  } catch (err) {
    log("KALDI", id, name, err.message?.split("\n")[0])
    results.push({ id, name, status: "KALDI", error: err.message?.split("\n")[0] })
  }
}

// ── Ana çalıştırıcı ────────────────────────────────────────────────────────────

async function main() {
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    console.error("\n❌ Hata: SELENIUM_TEST_EMAIL ve SELENIUM_TEST_PASSWORD env değişkenleri gerekli.")
    console.error("   .env.local dosyanıza ekleyin veya terminalde set edin:\n")
    console.error("   export SELENIUM_TEST_EMAIL=test@example.com")
    console.error("   export SELENIUM_TEST_PASSWORD=sifreniz\n")
    process.exit(1)
  }

  console.log("\n" + "═".repeat(60))
  console.log("  BudgetAssist — Selenium E2E Testleri")
  console.log("  Hedef: " + BASE_URL)
  console.log("  Tarih: " + new Date().toLocaleString("tr-TR"))
  console.log("═".repeat(60))

  const options = new chrome.Options()
  options.addArguments(
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--window-size=1440,900",
    "--disable-blink-features=AutomationControlled"
  )

  const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build()

  try {
    console.log("\n📌 Faz 1 — Sayfa yükleme")
    await runTest("TC-E2E-00", "Uygulama açılıyor (readyState check)", tcPageLoads, driver)

    console.log("\n📌 Faz 2 — Kimlik Doğrulama (Auth)")
    await runTest("TC-04", "Yanlış şifre ile giriş reddedilmeli", tcInvalidLogin, driver)
    await runTest("TC-03", "Geçerli kimlik bilgileriyle giriş", tc03_login, driver)

    console.log("\n📌 Faz 3 — Dashboard & Navigasyon")
    await runTest("TC-E2E-01", "Dashboard yükleniyor", tcDashboardVisible, driver)
    await runTest("TC-E2E-02", "İşlemler sayfasına navigasyon", tcNavigateTransactions, driver)
    await runTest("TC-E2E-03", "AI Koç sayfasına navigasyon", tcNavigateAiCoach, driver)

    console.log("\n📌 Faz 4 — Güvenlik")
    await runTest("TC-30", "Admin erişim kontrolü (normal kullanıcı)", tcAdminRedirect, driver)

    console.log("\n📌 Faz 5 — Çıkış")
    await runTest("TC-05", "Çıkış yapma ve giriş ekranına yönlendirme", tc05_logout, driver)
  } finally {
    await driver.quit()
  }

  // ── Sonuç özeti ──────────────────────────────────────────────────────────────
  const passed = results.filter((r) => r.status === "GEÇTI").length
  const failed = results.filter((r) => r.status === "KALDI").length
  const total = results.length

  console.log("\n" + "═".repeat(60))
  console.log(`  SONUÇ: ${passed}/${total} test geçti   ${failed > 0 ? `| ${failed} başarısız` : ""}`)
  console.log("═".repeat(60))

  if (failed > 0) {
    console.log("\n❌ Başarısız testler:")
    results.filter((r) => r.status === "KALDI").forEach((r) =>
      console.log(`   ${r.id}: ${r.name} — ${r.error}`)
    )
    process.exit(1)
  }

  console.log("\n✅ Tüm E2E testler geçti.\n")
}

main().catch((err) => {
  console.error("\n💥 Test runner çöktü:", err.message)
  process.exit(1)
})
