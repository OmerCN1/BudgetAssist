import { useEffect, useMemo } from "react"
import { S, FONT_BODY, btnPrimary, btnGhost } from "../../constants/theme"
import { LANGUAGE_OPTIONS } from "../../constants/language"
import {
  PROJECT_REPOSITORY_URL,
  PROJECT_ISSUES_URL,
  PROJECT_SECURITY_URL,
} from "../../constants/project"
const BRAND_LOGO_LIGHT_SRC = "/assets/ba_logo_black.svg"
const BRAND_LOGO_DARK_SRC = "/assets/ba_logo_white.svg"

const PAGES = {
  privacy: {
    label: "Demo Veri Bilgilendirmesi",
    kicker: "Veri kullanımı",
    title: "Test verileriyle keşfedin.",
    summary:
      "BudgetAssist bir eğitim projesidir. Hesap oluşturduğunuzda veya veri eklediğinizde, bağlı Supabase projesinde gerçek kayıtlar oluşabilir. Yalnızca sentetik test verileri kullanın.",
    stat: "Eğitim amaçlı demo",
    updated: "10 Ekim 2026",
    cards: [
      [
        "Hesap ve kayıtlar",
        "Hesap bilgileri Supabase Auth ile; profil, işlem, hedef ve diğer kayıtlar bağlı veritabanıyla işlenir.",
      ],
      [
        "AI özellikleri",
        "AI Koç kullanıldığında finansal özetiniz ve mesajınız, fiş tarandığında yüklediğiniz görüntü yapılandırılmış Groq hizmetine gönderilir.",
      ],
      [
        "Örnek içerik",
        "Tanıtım ekranlarındaki bakiyeler ve kullanım senaryoları örnektir. Kendi eklediğiniz kayıtlar ise demo metinleriyle otomatik olarak anonimleşmez.",
      ],
    ],
    sections: [
      [
        "Hassas bilgiler",
        "Gerçek banka bilgileri, kimlik bilgileri, gerçek fişler veya başkalarına ait kişisel veriler yüklemeyin.",
      ],
      [
        "Saklama ve silme",
        "Kayıtları uygulamanın sunduğu düzenleme ve silme araçlarıyla yönetin. Hesap ve depolama verilerinin tamamen temizlenmesi, ilgili Supabase projesini yöneten kişinin sorumluluğundadır; otomatik silme süresi taahhüt edilmez.",
      ],
      [
        "Kuruluma bağlı hizmetler",
        "E-posta ve SMS özellikleri etkinleştirilirse bildirim verileri Resend ve Twilio üzerinden işlenir. Bu sayfa demo veri akışını açıklar; bir mevzuat uyumluluk sertifikası değildir.",
      ],
    ],
  },
  terms: {
    label: "Demo Kullanım Koşulları",
    kicker: "Kullanım",
    title: "Öğrenmek ve test etmek için.",
    summary:
      "BudgetAssist, yazılım geliştirme ve test süreçlerini göstermek için hazırlanmıştır. Ticari bir finans hizmeti, yatırım danışmanlığı veya ödeme sistemi değildir.",
    stat: "Ticari olmayan demo",
    updated: "10 Ekim 2026",
    cards: [
      [
        "Test hesabı",
        "Kendinize ait bir test hesabı ve sentetik finansal kayıtlarla deneyin.",
      ],
      [
        "Örnek planlar",
        "Plan seçimi uygulama içindeki demo durumunu değiştirir. Gösterilen fiyatlar satış teklifi değildir; gerçek ödeme veya otomatik yenileme yapılmaz.",
      ],
      [
        "Test sınırları",
        "Yük ve güvenlik testlerini yalnızca size ait veya test etme izniniz bulunan ortamlarda çalıştırın.",
      ],
    ],
    sections: [
      [
        "Projenin kapsamı",
        "İşlem takibi, raporlama ve planlama akışları eğitim amacıyla sunulur. AI yanıtları hatalı olabilir; gerçek finansal kararlar için doğrulanmış bilgi olarak kullanılmamalıdır.",
      ],
      [
        "Hizmet beklentisi",
        "Kesintisiz çalışma, veri saklama, destek yanıt süresi veya 30 günlük Premium deneme taahhüdü verilmez.",
      ],
      [
        "Açık kaynak lisansı",
        "Kaynak kodu MIT lisansı ile paylaşılır. Kullanım ve dağıtım koşulları için depodaki LICENSE dosyasını inceleyin.",
      ],
    ],
  },
  security: {
    label: "Demo Güvenliği",
    kicker: "Güvenlik",
    title: "Kontrolleri ve sınırlarını bilin.",
    summary:
      "Projede Supabase kimlik doğrulaması ve veritabanı erişim politikaları bulunur. Bu kontrollerin çalışması, güncel şemanın ve izinlerin kullandığınız ortama uygulanmasına bağlıdır.",
    stat: "Şema ve izin testleri",
    updated: "10 Ekim 2026",
    cards: [
      [
        "Kimlik doğrulama",
        "Hesap ve oturum işlemleri Supabase Auth üzerinden yürütülür.",
      ],
      [
        "Erişim politikaları",
        "RLS politikaları kullanıcı kayıtlarını ayırır. Profil rolü ve yasak durumu için oluşturma/güncelleme kontrolleri ve regresyon testleri bulunur.",
      ],
      [
        "Doğrulama sınırı",
        "Bu proje için bağımsız güvenlik sertifikası, ölçülmüş güvenlik puanı veya sürekli izleme hizmeti sunulmaz.",
      ],
    ],
    sections: [
      [
        "Kurulum sorumluluğu",
        "Veritabanı şemasını ve güvenlik güncellemelerini uygulayın. Anahtarları sunucu tarafında saklayın; dağıtılan ortamın erişim ve depolama ayarlarını doğrulayın.",
      ],
      [
        "Belge ve AI akışı",
        "Fiş ve avatar dosyaları özel Supabase Storage bucket’larında saklanır. AI işlemlerinde gönderilen veriler yapılandırılmış Groq hizmeti tarafından işlenir.",
      ],
      [
        "Güvenlik bildirimi",
        "Bildirim yöntemi ve desteklenen kapsam için depodaki SECURITY.md dosyasını okuyun. Açık GitHub Issue’larına anahtar, kişisel veri veya istismar ayrıntısı eklemeyin.",
      ],
    ],
  },
  contact: {
    label: "Proje ve Geri Bildirim",
    kicker: "Açık kaynak",
    title: "Projeyi birlikte geliştirelim.",
    summary:
      "Bu eğitim projesinin kaynak kodunu GitHub üzerinden inceleyebilir, kişisel veri içermeyen hata bildirimlerini ve geliştirme önerilerini Issues bölümünde paylaşabilirsiniz.",
    stat: "GitHub üzerinden geri bildirim",
    updated: "10 Ekim 2026",
    cards: [
      [
        "Kaynak kodu",
        "Kurulum, testler ve bilinen sınırlar için depoyu ve README dosyasını inceleyin.",
      ],
      [
        "Hata bildirimi",
        "Hatanın adımlarını, beklenen sonucu ve kullandığınız sürümü yazın. Ekran görüntülerindeki kişisel verileri gizleyin.",
      ],
      [
        "Geliştirme önerisi",
        "Önerinizi kullanım senaryosuyla birlikte GitHub Issues üzerinden paylaşın.",
      ],
    ],
    sections: [
      [
        "Destek kapsamı",
        "Ticari destek ekibi, iş ortaklığı kanalı veya belirli bir yanıt süresi taahhüdü yoktur.",
      ],
      [
        "Güvenli paylaşım",
        "E-posta adresinizi, parolanızı, erişim anahtarınızı veya gerçek finansal kayıtlarınızı açık bildirimlere eklemeyin.",
      ],
      [
        "Katkı",
        "Değişiklik yapmak için depoyu fork edin, testlerinizi çalıştırın ve bir pull request açın.",
      ],
    ],
  },
}

const footerPages = ["privacy", "terms", "security", "contact"]

const PAGES_EN = {
  privacy: {
    label: "Demo Data Notice",
    kicker: "Data use",
    title: "Explore with synthetic data.",
    summary:
      "BudgetAssist is an educational project. Creating accounts or adding records can store real data in the connected Supabase project. Use synthetic test data only.",
    stat: "Educational demo",
    updated: "October 10, 2026",
    cards: [
      [
        "Accounts and records",
        "Supabase Auth processes accounts; the connected database stores profiles, transactions, goals, and other records.",
      ],
      [
        "AI features",
        "AI Coach sends your financial summary and message to the configured Groq service. Receipt scanning sends the uploaded image.",
      ],
      [
        "Sample content",
        "Marketing balances and use cases are illustrative. Data you enter is not automatically anonymized by the demo notices.",
      ],
    ],
    sections: [
      [
        "Sensitive information",
        "Do not upload real bank details, identity documents, actual receipts, or other people’s personal data.",
      ],
      [
        "Retention and deletion",
        "Manage records using the available editing and deletion tools. Complete cleanup of account and storage data is the responsibility of the connected Supabase project operator; no automatic deletion schedule is promised.",
      ],
      [
        "Optional services",
        "When enabled, email and SMS notification data is processed through Resend and Twilio. This notice describes demo data flows; it is not a compliance certification.",
      ],
    ],
  },
  terms: {
    label: "Demo Terms of Use",
    kicker: "Use",
    title: "Built for learning and testing.",
    summary:
      "BudgetAssist demonstrates software development and testing. It is not a commercial financial service, investment advisory service, or payment system.",
    stat: "Non-commercial demo",
    updated: "October 10, 2026",
    cards: [
      [
        "Test accounts",
        "Use your own test account and synthetic financial records.",
      ],
      [
        "Sample plans",
        "Plan selection changes demo application state. Displayed prices are not sales offers; no actual payments or automatic renewals take place.",
      ],
      [
        "Testing boundaries",
        "Run load and security tests only in environments you own or have permission to test.",
      ],
    ],
    sections: [
      [
        "Project scope",
        "Tracking, reporting, and planning flows are provided for education. AI responses may be incorrect and should not be treated as verified information for real financial decisions.",
      ],
      [
        "Service expectations",
        "There is no commitment to uninterrupted availability, data retention, support response times, or a 30-day Premium trial.",
      ],
      [
        "Open-source license",
        "Source code is shared under the MIT license. See the repository’s LICENSE file for usage and distribution terms.",
      ],
    ],
  },
  security: {
    label: "Demo Security",
    kicker: "Security",
    title: "Understand the controls and their limits.",
    summary:
      "The project includes Supabase authentication and database access policies. Their effectiveness depends on applying the current schema and permissions to your environment.",
    stat: "Schema and permission tests",
    updated: "October 10, 2026",
    cards: [
      ["Authentication", "Account and session operations use Supabase Auth."],
      [
        "Access policies",
        "RLS policies separate user records. Profile roles and ban status have insert/update protections and regression tests.",
      ],
      [
        "Verification limits",
        "This project offers no independent security certification, measured security score, or continuous monitoring service.",
      ],
    ],
    sections: [
      [
        "Deployment responsibility",
        "Apply the database schema and security updates. Keep secret keys server-side and verify access and storage configuration in your deployed environment.",
      ],
      [
        "Documents and AI",
        "Receipt and avatar files are stored in private Supabase Storage buckets. Data sent for AI processing is handled by the configured Groq service.",
      ],
      [
        "Security reports",
        "Read SECURITY.md in the repository for reporting guidance and scope. Do not post keys, personal data, or exploit details in public GitHub Issues.",
      ],
    ],
  },
  contact: {
    label: "Project and Feedback",
    kicker: "Open source",
    title: "Help improve the project.",
    summary:
      "Explore this educational project on GitHub. Share bug reports and feature suggestions without personal data through Issues.",
    stat: "Feedback through GitHub",
    updated: "October 10, 2026",
    cards: [
      [
        "Source code",
        "See the repository and README for setup, tests, and known limitations.",
      ],
      [
        "Bug reports",
        "Describe reproduction steps, expected behavior, and the version you used. Redact personal information from screenshots.",
      ],
      [
        "Suggestions",
        "Share your suggestion and its use case through GitHub Issues.",
      ],
    ],
    sections: [
      [
        "Support scope",
        "There is no commercial support team, partnership channel, or guaranteed response time.",
      ],
      [
        "Safe sharing",
        "Do not include your email address, password, access keys, or real financial records in public reports.",
      ],
      [
        "Contributions",
        "Fork the repository, run your tests, and open a pull request to contribute.",
      ],
    ],
  },
}

const UI_TEXT = {
  tr: {
    navLabel: "Bilgi sayfaları",
    login: "Giriş Yap",
    start: "Hemen Başla",
    back: "← Ana sayfaya dön",
    updated: "Son güncelleme",
    summarySuffix: "özeti",
    details: "Detaylar",
    otherPages: "Diğer sayfalar",
    relatedTitle: "Merak ettiğiniz başlığı açın.",
    ctaTitle: "BudgetAssist'i deneyin",
    ctaText: "Sentetik test verileriyle eğitim demosunu keşfedin.",
    freeStart: "Ücretsiz Başla",
    language: "Dil",
  },
  en: {
    navLabel: "Info pages",
    login: "Log In",
    start: "Get Started",
    back: "← Back to home",
    updated: "Last updated",
    summarySuffix: "summary",
    details: "Details",
    otherPages: "Other pages",
    relatedTitle: "Open the topic you are curious about.",
    ctaTitle: "Try BudgetAssist",
    ctaText: "Explore the educational demo using synthetic test data.",
    freeStart: "Start Free",
    language: "Language",
  },
}

function LanguageSwitch({ language, onChange }) {
  return (
    <div
      className="public-language-switch"
      role="group"
      aria-label={UI_TEXT[language]?.language || UI_TEXT.tr.language}
    >
      {LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={language === option.code ? "is-active" : ""}
          onClick={() => onChange?.(option.code)}
          aria-pressed={language === option.code}
          aria-label={option.name}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function PublicInfoPage({
  page = "privacy",
  onBackLanding,
  onLogin,
  onSignup,
  onOpenPage,
  language = "tr",
  onLanguageChange,
  theme = "dark",
}) {
  const pages = language === "en" ? PAGES_EN : PAGES
  const ui = UI_TEXT[language] || UI_TEXT.tr
  const content = pages[page] || pages.privacy
  const related = useMemo(
    () => footerPages.filter((id) => id !== page).slice(0, 3),
    [page],
  )
  const brandLogoSrc =
    theme === "light" ? BRAND_LOGO_LIGHT_SRC : BRAND_LOGO_DARK_SRC

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  const openPage = (event, id) => {
    event.preventDefault()
    onOpenPage(id)
  }

  return (
    <div
      className="public-page public-info-page"
      style={{ fontFamily: FONT_BODY }}
    >
      <nav className="public-nav public-info-nav">
        <button
          className="public-brand"
          onClick={onBackLanding}
          type="button"
          aria-label="BudgetAssist"
        >
          <img
            className="public-brand-logo"
            src={brandLogoSrc}
            alt="BudgetAssist"
          />
        </button>
        <div className="public-nav-links" aria-label={ui.navLabel}>
          {footerPages.map((id) => (
            <a
              href={`#${id}`}
              key={id}
              className={id === page ? "is-active" : ""}
              onClick={(event) => openPage(event, id)}
            >
              {pages[id].label}
            </a>
          ))}
        </div>
        <div className="public-nav-actions">
          <LanguageSwitch language={language} onChange={onLanguageChange} />
          <button
            onClick={onLogin}
            type="button"
            className="public-link-button"
          >
            {ui.login}
          </button>
          <button
            onClick={onSignup}
            type="button"
            style={{ ...btnPrimary, padding: "10px 20px" }}
          >
            {ui.start}
          </button>
        </div>
      </nav>

      <main className="public-info-main">
        <section className="public-info-hero">
          <div>
            <button
              type="button"
              className="public-info-back"
              onClick={onBackLanding}
            >
              {ui.back}
            </button>
            <span className="lp-section-label">{content.kicker}</span>
            <h1>{content.label}</h1>
            <p>{content.summary}</p>
          </div>
          <aside className="glass-card public-info-summary">
            <span>{ui.updated}</span>
            <strong>{content.updated}</strong>
            <small>{content.stat}</small>
          </aside>
        </section>

        <section
          className="public-info-card-grid"
          aria-label={`${content.label} ${ui.summarySuffix}`}
        >
          {content.cards.map(([title, text], index) => (
            <article className="glass-card public-info-card" key={title}>
              <span style={{ color: index === 1 ? S.cyan : S.green }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="glass-card public-info-detail">
          <div className="public-info-detail-head">
            <span className="lp-section-label">{ui.details}</span>
            <h2>{content.title}</h2>
          </div>
          <div className="public-info-section-list">
            {content.sections.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        {(page === "contact" || page === "security") && (
          <section
            className="public-info-related"
            aria-label={
              language === "en" ? "Project links" : "Proje bağlantıları"
            }
          >
            <div>
              <h2>
                {language === "en"
                  ? "Explore the repository"
                  : "Depoyu inceleyin"}
              </h2>
            </div>
            <div>
              <a
                href={PROJECT_REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={
                  page === "security"
                    ? PROJECT_SECURITY_URL
                    : PROJECT_ISSUES_URL
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {page === "security" ? "SECURITY.md" : "GitHub Issues"}
              </a>
            </div>
          </section>
        )}

        <section className="public-info-related">
          <div>
            <span className="lp-section-label">{ui.otherPages}</span>
            <h2>{ui.relatedTitle}</h2>
          </div>
          <div>
            {related.map((id) => (
              <a
                href={`#${id}`}
                key={id}
                onClick={(event) => openPage(event, id)}
              >
                {pages[id].label}
              </a>
            ))}
          </div>
        </section>

        <section className="public-info-cta">
          <h2>{ui.ctaTitle}</h2>
          <p>{ui.ctaText}</p>
          <div>
            <button
              onClick={onSignup}
              type="button"
              style={{ ...btnPrimary, padding: "14px 24px" }}
            >
              {ui.freeStart}
            </button>
            <button
              onClick={onLogin}
              type="button"
              style={{ ...btnGhost, padding: "14px 24px" }}
            >
              {ui.login}
            </button>
          </div>
        </section>
      </main>

      <footer className="public-footer">
        <div>
          <strong>BudgetAssist</strong>
          <span>
            {language === "en"
              ? "© 2026 BudgetAssist · Educational demo project"
              : "© 2026 BudgetAssist · Eğitim amaçlı demo proje"}
          </span>
        </div>
        <div>
          {footerPages.map((id) => (
            <a
              href={`#${id}`}
              key={id}
              onClick={(event) => openPage(event, id)}
            >
              {pages[id].label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
