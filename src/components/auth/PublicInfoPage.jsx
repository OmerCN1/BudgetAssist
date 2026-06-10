import { useEffect, useMemo } from "react"
import { S, FONT_BODY, btnPrimary, btnGhost } from "../../constants/theme"
import { LANGUAGE_OPTIONS } from "../../constants/language"
const BRAND_LOGO_LIGHT_SRC = "/assets/ba_logo_black.svg"
const BRAND_LOGO_DARK_SRC = "/assets/ba_logo_white.svg"


const PAGES = {
  privacy: {
    label: "Gizlilik Politikası",
    kicker: "Gizlilik",
    title: "Verileriniz sizin kontrolünüzde.",
    summary:
      "BudgetAssist, finansal verilerinizi yalnızca hesabınızdaki deneyimi oluşturmak, güvenliği korumak ve destek taleplerini yanıtlamak için kullanır.",
    stat: "KVKK / GDPR odakli",
    updated: "30 Nisan 2026",
    cards: [
      ["Veri kapsamı", "Profil, işlem, kategori, hedef, fiş ve uygulama kullanım verileri hesabınızla ilişkilendirilir."],
      ["Kullanım amacı", "Bütçe özeti, raporlama, AI analizleri, bildirimler ve destek süreçleri için işlenir."],
      ["Haklarınız", "Veri erişimi, düzeltme, silme ve dışa aktarma taleplerinizi destek ekibimize iletebilirsiniz."],
    ],
    sections: [
      ["Toplanan bilgiler", "Kayıt bilgileriniz, manuel eklediğiniz finansal kayıtlar, yüklediğiniz belgeler ve teknik oturum verileri saklanabilir."],
      ["Paylaşım", "Verileriniz satılmaz. Hizmetin çalışması için gerekli altyapı, kimlik doğrulama ve destek sağlayıcılarıyla sınırlı olarak işlenebilir."],
      ["Saklama", "Hesabınız aktif olduğu sürece veriler korunur. Hesap silme talebinizden sonra yasal zorunluluklar dışındaki kayıtlar temizlenir."],
    ],
  },
  terms: {
    label: "Kullanım Koşulları",
    kicker: "Koşullar",
    title: "Net kurallar, sorunsuz finans takibi.",
    summary:
      "BudgetAssist'i kullanarak hesabınızın güvenliğinden, girdiğiniz verilerin doğruluğundan ve hizmeti yasal amaçlarla kullanmaktan sorumlu olursunuz.",
    stat: "Adil kullanım",
    updated: "30 Nisan 2026",
    cards: [
      ["Hesap", "Hesap bilgilerinizin doğru ve güncel olması, şifrenizin korunması sizin sorumluluğunuzdadır."],
      ["Abonelik", "Ücretli planlar seçilen döneme göre yenilenir; iptal sonrası mevcut dönem sonuna kadar erişim sürer."],
      ["Kullanım", "Hizmet, kişisel veya iş finans takibi içindir; kötüye kullanım ve yetkisiz erişim girişimleri yasaktır."],
    ],
    sections: [
      ["Hizmet kapsamı", "BudgetAssist gelir, gider, hedef, rapor, belge ve AI destekli yorumlama araçları sunar. Finansal kararlar nihai olarak kullanıcıya aittir."],
      ["Plan değişiklikleri", "Özellikler ve fiyatlar önceden duyurularak güncellenebilir. Kritik değişikliklerde kullanıcıya bilgilendirme yapılır."],
      ["Fesih", "Koşullara aykırı kullanımda erişim kısıtlanabilir. Kullanıcı istediği zaman hesabını kapatma talebinde bulunabilir."],
    ],
  },
  security: {
    label: "Güvenlik",
    kicker: "Güvenlik",
    title: "Finansal veriler için sakin ve güçlü koruma.",
    summary:
      "BudgetAssist; kimlik doğrulama, erişim kontrolü, şifrelenmiş iletişim ve düzenli izleme yaklaşımlarıyla hassas verileri korumaya odaklanır.",
    stat: "%99.9 izleme",
    updated: "30 Nisan 2026",
    cards: [
      ["Şifreli trafik", "Tarayıcı ile servisler arasındaki iletişim modern TLS standartlarıyla korunur."],
      ["Erişim kontrolü", "Kullanıcı verileri hesap bazlı yetkilendirme kontrolleriyle ayrılır."],
      ["Operasyonel izleme", "Hata, performans ve güvenlik sinyalleri düzenli olarak takip edilir."],
    ],
    sections: [
      ["Kimlik doğrulama", "Oturum yönetimi ve hesap erişimi Supabase kimlik doğrulama altyapısı üzerinden yürütülür."],
      ["Belge güvenliği", "Yüklenen fiş ve belgeler hesap bağlamında saklanır; paylaşım ve erişim işlemleri yetkilendirme kontrollerinden geçer."],
      ["Sorumlu bildirim", "Güvenlik açığı şüphelerinizi destek kanalından iletin. Öncelikli inceleme ve geri bildirim süreci uygulanır."],
    ],
  },
  contact: {
    label: "İletişim",
    kicker: "İletişim",
    title: "Sorularınız için buradayız.",
    summary:
      "Ürün, hesap, faturalandırma veya güvenlik konularında ekibe ulaşabilirsiniz. Mesajınızı en doğru kanala yönlendirip hızlıca döneriz.",
    stat: "24 saat içinde dönüş",
    updated: "30 Nisan 2026",
    cards: [
      ["Destek", "support@budgetassist.app üzerinden hesap ve ürün yardımı alabilirsiniz."],
      ["Güvenlik", "security@budgetassist.app adresi güvenlik bildirimleri için öncelikli kanaldır."],
      ["İş ortaklığı", "partnerships@budgetassist.app ile entegrasyon ve iş birliği taleplerini paylaşabilirsiniz."],
    ],
    sections: [
      ["Çalışma saatleri", "Hafta içi 09:00-18:00 arasında destek talepleri öncelikli olarak yanıtlanır."],
      ["Yanıta eklenecekler", "Hesap e-postanızı, kısa sorun özetini ve varsa ekran görüntüsünü eklemek süreci hızlandırır."],
      ["Acil konular", "Hesap erişimi veya güvenlik şüphelerinde konu başlığına Acil ibaresi ekleyin."],
    ],
  },
}

const footerPages = ["privacy", "terms", "security", "contact"]

const PAGES_EN = {
  privacy: {
    label: "Privacy Policy",
    kicker: "Privacy",
    title: "Your data stays under your control.",
    summary:
      "BudgetAssist uses your financial data only to power your account experience, protect security, and respond to support requests.",
    stat: "KVKK / GDPR focused",
    updated: "April 30, 2026",
    cards: [
      ["Data scope", "Profile, transaction, category, goal, receipt, and app usage data may be associated with your account."],
      ["Purpose of use", "Data is processed for budget summaries, reporting, AI analysis, notifications, and support workflows."],
      ["Your rights", "You can send access, correction, deletion, and export requests to our support team."],
    ],
    sections: [
      ["Information collected", "Registration details, financial records you add manually, uploaded documents, and technical session data may be stored."],
      ["Sharing", "Your data is not sold. It may be processed only with infrastructure, authentication, and support providers needed to run the service."],
      ["Retention", "Data is protected while your account remains active. After an account deletion request, records outside legal obligations are cleared."],
    ],
  },
  terms: {
    label: "Terms of Use",
    kicker: "Terms",
    title: "Clear rules for smooth financial tracking.",
    summary:
      "By using BudgetAssist, you are responsible for your account security, the accuracy of the data you enter, and using the service for lawful purposes.",
    stat: "Fair use",
    updated: "April 30, 2026",
    cards: [
      ["Account", "You are responsible for keeping account details accurate and current, and for protecting your password."],
      ["Subscription", "Paid plans renew based on the selected billing period; after cancellation, access continues until the end of the current period."],
      ["Use", "The service is for personal or business finance tracking; misuse and unauthorized access attempts are prohibited."],
    ],
    sections: [
      ["Service scope", "BudgetAssist offers tools for income, expenses, goals, reports, documents, and AI-assisted interpretation. Financial decisions ultimately belong to the user."],
      ["Plan changes", "Features and prices may be updated with prior notice. Users are informed when critical changes occur."],
      ["Termination", "Access may be restricted for use that violates these terms. Users may request account closure at any time."],
    ],
  },
  security: {
    label: "Security",
    kicker: "Security",
    title: "Calm, strong protection for financial data.",
    summary:
      "BudgetAssist focuses on protecting sensitive data through authentication, access control, encrypted communication, and regular monitoring practices.",
    stat: "99.9% monitoring",
    updated: "April 30, 2026",
    cards: [
      ["Encrypted traffic", "Communication between the browser and services is protected with modern TLS standards."],
      ["Access control", "User data is separated through account-based authorization controls."],
      ["Operational monitoring", "Error, performance, and security signals are monitored regularly."],
    ],
    sections: [
      ["Authentication", "Session management and account access are handled through Supabase authentication infrastructure."],
      ["Document security", "Uploaded receipts and documents are stored within the account context; sharing and access operations pass through authorization controls."],
      ["Responsible disclosure", "Send suspected vulnerabilities through the support channel. Priority review and feedback processes are applied."],
    ],
  },
  contact: {
    label: "Contact",
    kicker: "Contact",
    title: "We are here for your questions.",
    summary:
      "You can reach the team about product, account, billing, or security topics. We route your message to the right channel and respond quickly.",
    stat: "Response within 24 hours",
    updated: "April 30, 2026",
    cards: [
      ["Support", "Get account and product help through support@budgetassist.app."],
      ["Security", "security@budgetassist.app is the priority channel for security reports."],
      ["Partnerships", "Share integration and collaboration requests through partnerships@budgetassist.app."],
    ],
    sections: [
      ["Business hours", "Support requests are prioritized on weekdays between 09:00 and 18:00."],
      ["What to include", "Adding your account email, a short issue summary, and screenshots when available helps speed up the process."],
      ["Urgent topics", "For account access or security concerns, add Urgent to the subject line."],
    ],
  },
}

const UI_TEXT = {
  tr: {
    navLabel: "Bilgi sayfalari",
    login: "Giriş Yap",
    start: "Hemen Başla",
    back: "← Ana sayfaya dön",
    updated: "Son güncelleme",
    summarySuffix: "ozeti",
    details: "Detaylar",
    otherPages: "Diger sayfalar",
    relatedTitle: "Merak ettiğiniz başlığı açın.",
    ctaTitle: "BudgetAssist'i deneyin",
    ctaText: "Finansal kayıtlarınızı daha net takip etmek için ücretsiz hesap oluşturun.",
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
    ctaText: "Create a free account to track your financial records with more clarity.",
    freeStart: "Start Free",
    language: "Language",
  },
}

function LanguageSwitch({ language, onChange }) {
  return (
    <div className="public-language-switch" role="group" aria-label={UI_TEXT[language]?.language || UI_TEXT.tr.language}>
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

export default function PublicInfoPage({ page = "privacy", onBackLanding, onLogin, onSignup, onOpenPage, language = "tr", onLanguageChange, theme = "dark" }) {
  const pages = language === "en" ? PAGES_EN : PAGES
  const ui = UI_TEXT[language] || UI_TEXT.tr
  const content = pages[page] || pages.privacy
  const related = useMemo(() => footerPages.filter((id) => id !== page).slice(0, 3), [page])
  const brandLogoSrc = theme === "light" ? BRAND_LOGO_LIGHT_SRC : BRAND_LOGO_DARK_SRC

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  const openPage = (event, id) => {
    event.preventDefault()
    onOpenPage(id)
  }

  return (
    <div className="public-page public-info-page" style={{ fontFamily: FONT_BODY }}>
      <nav className="public-nav public-info-nav">
        <button className="public-brand" onClick={onBackLanding} type="button" aria-label="BudgetAssist">
          <img className="public-brand-logo" src={brandLogoSrc} alt="BudgetAssist" />
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
          <button onClick={onLogin} type="button" className="public-link-button">{ui.login}</button>
          <button onClick={onSignup} type="button" style={{ ...btnPrimary, padding: "10px 20px" }}>
            {ui.start}
          </button>
        </div>
      </nav>

      <main className="public-info-main">
        <section className="public-info-hero">
          <div>
            <button type="button" className="public-info-back" onClick={onBackLanding}>
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

        <section className="public-info-card-grid" aria-label={`${content.label} ${ui.summarySuffix}`}>
          {content.cards.map(([title, text], index) => (
            <article className="glass-card public-info-card" key={title}>
              <span style={{ color: index === 1 ? S.cyan : S.green }}>{String(index + 1).padStart(2, "0")}</span>
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

        <section className="public-info-related">
          <div>
            <span className="lp-section-label">{ui.otherPages}</span>
            <h2>{ui.relatedTitle}</h2>
          </div>
          <div>
            {related.map((id) => (
              <a href={`#${id}`} key={id} onClick={(event) => openPage(event, id)}>
                {pages[id].label}
              </a>
            ))}
          </div>
        </section>

        <section className="public-info-cta">
          <h2>{ui.ctaTitle}</h2>
          <p>{ui.ctaText}</p>
          <div>
            <button onClick={onSignup} type="button" style={{ ...btnPrimary, padding: "14px 24px" }}>
              {ui.freeStart}
            </button>
            <button onClick={onLogin} type="button" style={{ ...btnGhost, padding: "14px 24px" }}>
              {ui.login}
            </button>
          </div>
        </section>
      </main>

      <footer className="public-footer">
        <div>
          <strong>BudgetAssist</strong>
          <span>© 2026 BudgetAssist. Private Wealth Management Systems.</span>
        </div>
        <div>
          {footerPages.map((id) => (
            <a href={`#${id}`} key={id} onClick={(event) => openPage(event, id)}>
              {pages[id].label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
