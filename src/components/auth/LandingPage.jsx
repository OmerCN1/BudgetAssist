import { useState, useEffect, useRef } from "react"
import { S, FONT_BODY, FONT_MONO, btnPrimary, btnGhost } from "../../constants/theme"
import { LANGUAGE_OPTIONS } from "../../constants/language"

const BRAND_LOGO_LIGHT_SRC = "/assets/ba_logo_black.svg"
const BRAND_LOGO_DARK_SRC = "/assets/ba_logo_white.svg"

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
}

const IconIncomeExpense = () => (
  <svg {...iconProps}>
    <path d="M4 18V6" />
    <path d="M4 18h16" />
    <path d="m7 14 3-3 3 2 5-6" />
    <path d="M15 7h3v3" />
  </svg>
)

const IconAiCoach = () => (
  <svg {...iconProps}>
    <path d="M12 3v3" />
    <path d="M5 12H3" />
    <path d="M21 12h-2" />
    <rect x="6" y="7" width="12" height="12" rx="4" />
    <path d="M9.5 12h.01" />
    <path d="M14.5 12h.01" />
    <path d="M9.5 15.5h5" />
  </svg>
)

const IconReports = () => (
  <svg {...iconProps}>
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <rect x="7" y="11" width="3" height="5" rx="1" />
    <rect x="12" y="7" width="3" height="9" rx="1" />
    <rect x="17" y="9" width="3" height="7" rx="1" />
  </svg>
)

const IconCreditCard = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 10h18" />
    <path d="M7 15h4" />
    <path d="M15 15h2" />
  </svg>
)

const IconDebt = () => (
  <svg {...iconProps}>
    <path d="M7 8h10" />
    <path d="M7 12h7" />
    <path d="M7 16h5" />
    <path d="M18 14l2 2-2 2" />
    <path d="M20 16h-5" />
    <rect x="4" y="4" width="16" height="16" rx="3" />
  </svg>
)

const IconRecurring = () => (
  <svg {...iconProps}>
    <path d="M17 2v5h-5" />
    <path d="M7 22v-5h5" />
    <path d="M20 11a8 8 0 0 0-13.6-5.6L4 8" />
    <path d="M4 13a8 8 0 0 0 13.6 5.6L20 16" />
  </svg>
)

const IconGoals = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <path d="m16 8 3-3" />
    <path d="M19 5h2" />
    <path d="M19 5V3" />
  </svg>
)

const IconReceipts = () => (
  <svg {...iconProps}>
    <path d="M7 3h10v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V3z" />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
    <path d="M9 16h3" />
  </svg>
)

const IconConnect = () => (
  <svg {...iconProps}>
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="M7 10h6" />
    <path d="M7 14h3" />
    <path d="M16 10l2 2-2 2" />
  </svg>
)

const IconTrack = () => (
  <svg {...iconProps}>
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <path d="M7 15h2" />
    <path d="M11 12h2" />
    <path d="M15 8h2" />
  </svg>
)

const IconShield = () => (
  <svg {...iconProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const IconLock = () => (
  <svg {...iconProps}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

const IconControl = () => (
  <svg {...iconProps}>
    <path d="M4 7h10" />
    <path d="M4 17h10" />
    <circle cx="17" cy="7" r="3" />
    <circle cx="17" cy="17" r="3" />
  </svg>
)

const IconSupport = () => (
  <svg {...iconProps}>
    <path d="M4 12a8 8 0 0 1 16 0" />
    <path d="M4 12v3a2 2 0 0 0 2 2h1v-5H4z" />
    <path d="M20 12v3a2 2 0 0 1-2 2h-1v-5h3z" />
    <path d="M13 19h2a3 3 0 0 0 3-3" />
  </svg>
)

const IconChevronDown = () => (
  <svg {...iconProps} width="18" height="18">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const FEATURES = [
  {
    Icon: IconIncomeExpense,
    color: S.green,
    title: "Gelir & Gider Takibi",
    desc: "Tüm işlemlerinizi otomatik kategorize edin. Gerçek zamanlı bakiye ve nakit akışı görünümüyle her zaman bir adım önde olun.",
    tag: "Temel",
  },
  {
    Icon: IconAiCoach,
    color: S.cyan,
    title: "AI Finansal Koç",
    desc: "Kişisel harcama alışkanlıklarınızı öğrenen yapay zeka, size özel tasarruf önerileri ve risk uyarıları sunar.",
    tag: "Premium",
    highlight: true,
  },
  {
    Icon: IconReports,
    color: S.green,
    title: "Detaylı Raporlar",
    desc: "Aylık trendler, kategori dağılımı ve nakit akışı grafikleriyle finansal durumunuzu net görün.",
    tag: "Standart",
  },
  {
    Icon: IconCreditCard,
    color: S.cyan,
    title: "Kredi Kartı Takibi",
    desc: "Birden fazla kredi kartınızı tek ekranda yönetin. Limit kullanımı, ekstre tarihleri ve borç durumunu takip edin.",
    tag: "Yeni",
    new: true,
  },
  {
    Icon: IconDebt,
    color: S.green,
    title: "Borç Yönetimi",
    desc: "Verdiğiniz ve aldığınız borçları takip edin. Otomatik hatırlatmalar ve ödeme planlamasıyla hiçbir borcu kaçırmayın.",
    tag: "Yeni",
    new: true,
  },
  {
    Icon: IconRecurring,
    color: S.green,
    title: "Tekrarlayan İşlemler",
    desc: "Kira, fatura, abonelik gibi düzenli ödemelerinizi otomatikleştirin. Hiçbir ödemeyi kaçırmazsınız.",
    tag: "Standart",
  },
  {
    Icon: IconGoals,
    color: S.cyan,
    title: "Hedef & Birikim",
    desc: "Finansal hedeflerinizi belirleyin, ilerlemenizi takip edin. Tatil, araba, ev — her hayalinizi planlayın.",
    tag: "Standart",
  },
  {
    Icon: IconReceipts,
    color: S.green,
    title: "Fiş & Fatura Arşivi",
    desc: "Kamera ile fişlerinizi tarayın, AI otomatik doldurun. Tüm belgeleriniz bulutta güvende.",
    tag: "Premium",
  },
]

const PLANS = [
  {
    name: "Ücretsiz",
    monthly: 0,
    note: "Başlangıç için",
    features: ["Gelir/Gider takibi", "3 kategori limiti", "Manuel veri girişi", "10 fiş arşivi"],
    action: "Ücretsiz Başla",
    tone: "muted",
  },
  {
    name: "Standart",
    monthly: 49,
    note: "En Popüler",
    features: ["Sınırsız kategori", "Kredi kartı takibi", "Borç & Varlık yönetimi", "Detaylı raporlar", "250 fiş arşivi", "Tekrarlayan işlemler"],
    action: "Standart'ı Seç",
    tone: "standard",
  },
  {
    name: "Premium",
    monthly: 149,
    note: "En İyi Değer",
    features: ["AI Finansal Koç", "Otomatik bütçe risk analizi", "Sınırsız hedef & birikim", "Sınırsız fiş arşivi", "Banka entegrasyonu", "Öncelikli destek"],
    action: "Premium'a Geç",
    tone: "premium",
  },
]

const TESTIMONIALS = [
  {
    text: "Kredi kartı takibi özelliği hayat kurtarıcı. 3 farklı kartımı tek ekranda görüp ekstre tarihlerimi kaçırmıyorum.",
    name: "Zeynep K.",
    role: "Yazılım Geliştirici",
    avatar: "ZK",
  },
  {
    text: "AI koç gerçekten işe yarıyor. İlk ayda aboneliklerimi düzenleyerek ₺640 tasarruf ettim.",
    name: "Mehmet D.",
    role: "Girişimci",
    avatar: "MD",
  },
  {
    text: "Borç takibi sayesinde arkadaşlarımla hesaplaşmak artık çok kolay. Hiçbir şeyi unutmuyorum.",
    name: "Ayşe Ş.",
    role: "Finans Uzmanı",
    avatar: "AŞ",
  },
  {
    text: "Fiş tarama özelliği muhasebe işimi ciddi şekilde rahatlattı. Harcamalarım artık kategorilere otomatik düşüyor.",
    name: "Kerem B.",
    role: "Kafe İşletmecisi",
    avatar: "KB",
  },
  {
    text: "Varlık ve borçlarımı aynı panelde görmek finansal durumumu çok daha net anlamamı sağladı.",
    name: "Selin A.",
    role: "Ürün Yöneticisi",
    avatar: "SA",
  },
  {
    text: "Hedef takibi sayesinde tatil bütçemi ilk kez dağılmadan tamamladım. Uyarılar tam zamanında geliyor.",
    name: "Tolga E.",
    role: "Tasarımcı",
    avatar: "TE",
  },
  {
    text: "Kredi kartı limitleri ve ekstre tarihleri tek ekranda olunca ay sonu sürprizleri bitti.",
    name: "Derya N.",
    role: "Satış Müdürü",
    avatar: "DN",
  },
  {
    text: "AI koçun abonelik önerileriyle kullanmadığım servisleri temizledim. İlk haftadan fark ettirdi.",
    name: "Mert Y.",
    role: "Serbest Çalışan",
    avatar: "MY",
  },
]

const HOW_IT_WORKS = [
  {
    Icon: IconConnect,
    step: "01",
    title: "Bağla",
    desc: "Hesabınızı oluşturun, gelir-gider kategorilerinizi ve ilk finansal hedeflerinizi dakikalar içinde tanımlayın.",
    stat: "3 dk",
  },
  {
    Icon: IconTrack,
    step: "02",
    title: "Takip Et",
    desc: "Varlık, borç, kart limiti ve tekrar eden ödemeleri tek panelde canlı bir finans akışına dönüştürün.",
    stat: "Tek panel",
  },
  {
    Icon: IconAiCoach,
    step: "03",
    title: "AI Öneri Al",
    desc: "AI koç harcama alışkanlıklarınızı analiz eder, tasarruf fırsatlarını ve riskleri anlaşılır önerilere çevirir.",
    stat: "%23 tasarruf",
  },
]

const SECURITY_POINTS = [
  {
    Icon: IconLock,
    title: "Şifreli altyapı",
    desc: "Hassas oturum ve veri akışları modern güvenlik pratikleriyle korunur.",
  },
  {
    Icon: IconControl,
    title: "Veri kontrolü sizde",
    desc: "Hesap, işlem ve arşiv verilerinizi istediğiniz zaman yönetebilirsiniz.",
  },
  {
    Icon: IconShield,
    title: "Güvenli finans deneyimi",
    desc: "Gizlilik, erişim ve hesap güvenliği landing akışının merkezinde tutulur.",
  },
  {
    Icon: IconSupport,
    title: "Destek hazır",
    desc: "Kurulum, güvenlik veya hesap sorularında iletişim kanalları açık kalır.",
  },
]

const FAQS = [
  {
    q: "Ücretsiz planla başlayabilir miyim?",
    a: "Evet. Temel gelir-gider takibiyle başlayabilir, ihtiyaçlarınız arttığında Standart veya Premium plana geçebilirsiniz.",
  },
  {
    q: "Kredi kartı bilgilerim gerekiyor mu?",
    a: "Ücretsiz hesap oluşturmak için kredi kartı gerekmez. Plan seçimini daha sonra yapabilirsiniz.",
  },
  {
    q: "AI koç neyi analiz eder?",
    a: "Harcama eğilimlerinizi, aboneliklerinizi, bütçe risklerini ve tasarruf fırsatlarını anlaşılır önerilere dönüştürür.",
  },
  {
    q: "Verilerimi sonradan yönetebilir miyim?",
    a: "Evet. İşlem, fiş, hedef ve hesap bilgilerinizi panel üzerinden düzenleyebilir veya kaldırabilirsiniz.",
  },
]

const STATS = [
  { value: "500K+", label: "Aktif Kullanıcı", color: S.text },
  { value: "₺12B+", label: "Yönetilen Varlık", color: S.green },
  { value: "%99.9", label: "Güvenlik Skoru", color: S.text },
  { value: "4.9/5", label: "App Store Puanı", color: S.cyan },
]

const HERO_CHART_TREND =
  "M0,72 C0.18,72 0.32,72 0.5,72 C0.84,70 1.16,64 1.5,64 C1.84,64 2.16,56 2.5,56 C2.84,56 3.16,62 3.5,62 C3.84,62 4.16,46 4.5,46 C4.84,46 5.16,38 5.5,38 C5.84,38 6.16,42 6.5,42 C6.84,42 7.16,30 7.5,30 C7.84,30 8.16,20 8.5,20 C8.84,20 9.16,26 9.5,26 C9.84,26 10.16,12 10.5,12 C10.84,12 11.16,4 11.5,4 C11.68,4 11.82,4 12,4"
const HERO_CHART_AREA = `${HERO_CHART_TREND} L12,100 L0,100 Z`
const HERO_TOTAL_AMOUNT = 284750
const EN_TRANSLATIONS = {
  "Gelir & Gider Takibi": "Income & Expense Tracking",
  "Tüm işlemlerinizi otomatik kategorize edin. Gerçek zamanlı bakiye ve nakit akışı görünümüyle her zaman bir adım önde olun.": "Automatically categorize every transaction. Stay one step ahead with real-time balance and cash-flow visibility.",
  "Temel": "Core",
  "AI Finansal Koç": "AI Financial Coach",
  "Kişisel harcama alışkanlıklarınızı öğrenen yapay zeka, size özel tasarruf önerileri ve risk uyarıları sunar.": "AI learns your personal spending habits and delivers tailored saving tips and risk alerts.",
  "Premium": "Premium",
  "Detaylı Raporlar": "Detailed Reports",
  "Aylık trendler, kategori dağılımı ve nakit akışı grafikleriyle finansal durumunuzu net görün.": "See your financial picture clearly with monthly trends, category breakdowns, and cash-flow charts.",
  "Standart": "Standard",
  "Kredi Kartı Takibi": "Credit Card Tracking",
  "Birden fazla kredi kartınızı tek ekranda yönetin. Limit kullanımı, ekstre tarihleri ve borç durumunu takip edin.": "Manage multiple credit cards in one place. Track limit usage, statement dates, and balances.",
  "Yeni": "New",
  "Borç Yönetimi": "Debt Management",
  "Verdiğiniz ve aldığınız borçları takip edin. Otomatik hatırlatmalar ve ödeme planlamasıyla hiçbir borcu kaçırmayın.": "Track money you owe and money owed to you. Never miss a debt with reminders and payment planning.",
  "Tekrarlayan İşlemler": "Recurring Transactions",
  "Kira, fatura, abonelik gibi düzenli ödemelerinizi otomatikleştirin. Hiçbir ödemeyi kaçırmazsınız.": "Automate rent, bills, subscriptions, and other regular payments so nothing slips through.",
  "Hedef & Birikim": "Goals & Savings",
  "Finansal hedeflerinizi belirleyin, ilerlemenizi takip edin. Tatil, araba, ev — her hayalinizi planlayın.": "Set financial goals and track progress. Plan every dream, from a trip to a car or home.",
  "Fiş & Fatura Arşivi": "Receipt & Invoice Archive",
  "Kamera ile fişlerinizi tarayın, AI otomatik doldurun. Tüm belgeleriniz bulutta güvende.": "Scan receipts with your camera and let AI fill in the details. Keep every document safely in the cloud.",
  "Ücretsiz": "Free",
  "Başlangıç için": "For getting started",
  "Gelir/Gider takibi": "Income/expense tracking",
  "3 kategori limiti": "3 category limit",
  "Manuel veri girişi": "Manual data entry",
  "10 fiş arşivi": "10 receipt archive",
  "Ücretsiz Başla": "Start Free",
  "En Popüler": "Most Popular",
  "Sınırsız kategori": "Unlimited categories",
  "Borç & Varlık yönetimi": "Debt & asset management",
  "250 fiş arşivi": "250 receipt archive",
  "Standart'ı Seç": "Choose Standard",
  "En İyi Değer": "Best Value",
  "Otomatik bütçe risk analizi": "Automated budget risk analysis",
  "Sınırsız hedef & birikim": "Unlimited goals & savings",
  "Sınırsız fiş arşivi": "Unlimited receipt archive",
  "Banka entegrasyonu": "Bank integration",
  "Öncelikli destek": "Priority support",
  "Premium'a Geç": "Upgrade to Premium",
  "Kredi kartı takibi özelliği hayat kurtarıcı. 3 farklı kartımı tek ekranda görüp ekstre tarihlerimi kaçırmıyorum.": "The credit card tracking feature is a lifesaver. I see three different cards in one screen and never miss statement dates.",
  "Yazılım Geliştirici": "Software Developer",
  "AI koç gerçekten işe yarıyor. İlk ayda aboneliklerimi düzenleyerek ₺640 tasarruf ettim.": "The AI coach really works. I saved ₺640 in the first month by organizing my subscriptions.",
  "Girişimci": "Founder",
  "Borç takibi sayesinde arkadaşlarımla hesaplaşmak artık çok kolay. Hiçbir şeyi unutmuyorum.": "Debt tracking makes settling up with friends incredibly easy. I do not forget anything anymore.",
  "Finans Uzmanı": "Finance Specialist",
  "Fiş tarama özelliği muhasebe işimi ciddi şekilde rahatlattı. Harcamalarım artık kategorilere otomatik düşüyor.": "Receipt scanning has made my accounting work much lighter. My expenses now land in categories automatically.",
  "Kafe İşletmecisi": "Cafe Owner",
  "Varlık ve borçlarımı aynı panelde görmek finansal durumumu çok daha net anlamamı sağladı.": "Seeing assets and debts in the same panel helped me understand my financial position much more clearly.",
  "Ürün Yöneticisi": "Product Manager",
  "Hedef takibi sayesinde tatil bütçemi ilk kez dağılmadan tamamladım. Uyarılar tam zamanında geliyor.": "Goal tracking helped me complete my vacation budget without losing focus for the first time. Alerts arrive right on time.",
  "Tasarımcı": "Designer",
  "Kredi kartı limitleri ve ekstre tarihleri tek ekranda olunca ay sonu sürprizleri bitti.": "Having card limits and statement dates in one screen ended those month-end surprises.",
  "Satış Müdürü": "Sales Manager",
  "AI koçun abonelik önerileriyle kullanmadığım servisleri temizledim. İlk haftadan fark ettirdi.": "The AI coach's subscription tips helped me clean up services I no longer used. I noticed the difference in week one.",
  "Serbest Çalışan": "Freelancer",
  "Bağla": "Connect",
  "Hesabınızı oluşturun, gelir-gider kategorilerinizi ve ilk finansal hedeflerinizi dakikalar içinde tanımlayın.": "Create your account, define income and expense categories, and set your first financial goals in minutes.",
  "3 dk": "3 min",
  "Takip Et": "Track",
  "Varlık, borç, kart limiti ve tekrar eden ödemeleri tek panelde canlı bir finans akışına dönüştürün.": "Turn assets, debts, card limits, and recurring payments into one live financial flow.",
  "Tek panel": "One panel",
  "AI Öneri Al": "Get AI Tips",
  "AI koç harcama alışkanlıklarınızı analiz eder, tasarruf fırsatlarını ve riskleri anlaşılır önerilere çevirir.": "The AI coach analyzes your spending habits and turns saving opportunities and risks into clear suggestions.",
  "%23 tasarruf": "23% savings",
  "Şifreli altyapı": "Encrypted infrastructure",
  "Hassas oturum ve veri akışları modern güvenlik pratikleriyle korunur.": "Sensitive sessions and data flows are protected with modern security practices.",
  "Veri kontrolü sizde": "You control your data",
  "Hesap, işlem ve arşiv verilerinizi istediğiniz zaman yönetebilirsiniz.": "Manage your account, transaction, and archive data whenever you want.",
  "Güvenli finans deneyimi": "Secure finance experience",
  "Gizlilik, erişim ve hesap güvenliği landing akışının merkezinde tutulur.": "Privacy, access, and account security stay central to the landing experience.",
  "Destek hazır": "Support is ready",
  "Kurulum, güvenlik veya hesap sorularında iletişim kanalları açık kalır.": "Communication channels stay open for setup, security, or account questions.",
  "Ücretsiz planla başlayabilir miyim?": "Can I start with the free plan?",
  "Evet. Temel gelir-gider takibiyle başlayabilir, ihtiyaçlarınız arttığında Standart veya Premium plana geçebilirsiniz.": "Yes. You can start with core income and expense tracking, then move to Standard or Premium as your needs grow.",
  "Kredi kartı bilgilerim gerekiyor mu?": "Do I need to enter credit card details?",
  "Ücretsiz hesap oluşturmak için kredi kartı gerekmez. Plan seçimini daha sonra yapabilirsiniz.": "No credit card is required to create a free account. You can choose a plan later.",
  "AI koç neyi analiz eder?": "What does the AI coach analyze?",
  "Harcama eğilimlerinizi, aboneliklerinizi, bütçe risklerini ve tasarruf fırsatlarını anlaşılır önerilere dönüştürür.": "It turns spending trends, subscriptions, budget risks, and saving opportunities into clear recommendations.",
  "Verilerimi sonradan yönetebilir miyim?": "Can I manage my data later?",
  "Evet. İşlem, fiş, hedef ve hesap bilgilerinizi panel üzerinden düzenleyebilir veya kaldırabilirsiniz.": "Yes. You can edit or remove transactions, receipts, goals, and account details from the dashboard.",
  "Aktif Kullanıcı": "Active Users",
  "Yönetilen Varlık": "Assets Managed",
  "Güvenlik Skoru": "Security Score",
  "App Store Puanı": "App Store Rating",
  "Navigasyon": "Navigation",
  "Menüyü kapat": "Close menu",
  "Menüyü aç": "Open menu",
  "Özellikler": "Features",
  "Planlar": "Plans",
  "Güvenlik": "Security",
  "İletişim": "Contact",
  "Giriş Yap": "Log In",
  "Hemen Başla": "Get Started",
  "Yeni: AI Finans Koçu v2.0 · Varlık & Borç Takibi · Kredi Kartı Yönetimi": "New: AI Finance Coach v2.0 · Asset & Debt Tracking · Credit Card Management",
  "Paranızı": "Manage your",
  "akıllıca": "money",
  "yönetin.": "smarter.",
  "Gelir, gider, borç, varlık ve yatırımlarınızı tek platformda takip edin. AI destekli analizlerle finansal hedeflerinize çok daha hızlı ulaşın.": "Track income, expenses, debt, assets, and investments in one platform. Reach your financial goals much faster with AI-powered analysis.",
  "Ücretsiz Başla →": "Start Free →",
  "47.000+ kullanıcı · 4.9/5 puan": "47,000+ users · 4.9/5 rating",
  "Toplam Varlık": "Total Assets",
  "Toplam varlık 284.750 Türk lirası": "Total assets 284,750 Turkish lira",
  "+%4.8 bu ay": "+4.8% this month",
  "Kredi Kartı": "Credit Card",
  "Borçlar": "Debts",
  "Hedef": "Goal",
  "Varlıklar": "Assets",
  "Maaş": "Salary",
  "Bugün": "Today",
  "Kira": "Rent",
  "Dün": "Yesterday",
  "3 gün önce": "3 days ago",
  "AI Koç": "AI Coach",
  "Bu ay abonelik giderlerini %23 azaltabilirsiniz.": "You can reduce subscription expenses by 23% this month.",
  "Limit Kullanımı": "Limit Usage",
  "Desteklenen finansal kurumlar": "Supported financial institutions",
  "Nasıl Çalışır?": "How It Works",
  "Finansal kontrolü": "Build financial control",
  "3 adımda kurun": "in 3 steps",
  "Dağınık işlem, hedef ve ödeme bilgilerini karar alabileceğiniz sade bir akışa çevirin.": "Turn scattered transactions, goals, and payment details into a simple flow you can act on.",
  "8 Güçlü Özellik": "8 Powerful Features",
  "Her finansal ihtiyacınız için": "One platform for every",
  "tek platform": "financial need",
  "Sıradan bir bütçe uygulaması değil — tam kapsamlı bir finansal kontrol merkezi.": "Not just another budgeting app. It is a complete financial control center.",
  "özelliğini keşfet →": "feature →",
  "Maaş Ödemesi": "Salary Payment",
  "Market": "Groceries",
  "Elektrik": "Electricity",
  "Kira Geliri": "Rental Income",
  "Bu ay yemek harcamanız %34 arttı. Geçen ay ortalama ₺2.100 harcadınız.": "Your food spending increased 34% this month. Last month you spent ₺2,100 on average.",
  "Netflix, Spotify ve 3 aboneliğiniz çakışıyor — aylık ₺340 tasarruf mümkün.": "Netflix, Spotify, and 3 subscriptions overlap. Monthly savings of ₺340 are possible.",
  "Oca": "Jan",
  "Şub": "Feb",
  "Mar": "Mar",
  "Nis": "Apr",
  "May": "May",
  "Haz": "Jun",
  "Limit kullanımı": "Limit usage",
  "Ahmet'e borçlu": "Owe Ahmet",
  "Zeynep'ten alacak": "Receivable from Zeynep",
  "Kira borcum": "Rent debt",
  "15 Mayıs": "May 15",
  "22 Mayıs": "May 22",
  "1 Haziran": "June 1",
  "Her ay 1'i": "1st of every month",
  "Her ay 15'i": "15th of every month",
  "İnternet": "Internet",
  "Her ay 20'si": "20th of every month",
  "Tatil Fonu": "Vacation Fund",
  "Araba Birikikim": "Car Savings",
  "Acil Durum Fonu": "Emergency Fund",
  "3 May": "May 3",
  "1 May": "May 1",
  "28 Nis": "Apr 28",
  "Elektronik": "Electronics",
  "Finans verileriniz için sakin ve güvenli bir alan.": "A calm, secure space for your financial data.",
  "BudgetAssist, kişisel finans verilerinizi anlaşılır kontroller ve güvenli hesap deneyimiyle yönetmeniz için tasarlandı.": "BudgetAssist is designed to help you manage personal finance data with clear controls and a secure account experience.",
  "Güvenlik detaylarını incele →": "Review security details →",
  "Kullanıcı Yorumları": "User Stories",
  "47.000+ kişi zaten kullanıyor": "47,000+ people already use it",
  "Kullanıcı yorumları": "User testimonials",
  "Fiyatlandırma": "Pricing",
  "Planınızı seçin": "Choose your plan",
  "Ücretsiz başlayın, ihtiyaç büyüdükçe yükseltin.": "Start free and upgrade as your needs grow.",
  "Fatura dönemi": "Billing period",
  "Aylık": "Monthly",
  "Yıllık": "Yearly",
  "/ay": "/mo",
  "Yıllık ödemede": "Save",
  "tasarruf": "with yearly billing",
  "Sık Sorulan Sorular": "FAQ",
  "Başlamadan önce": "Questions before",
  "aklınızdaki sorular": "you get started",
  "yanıtını": "answer",
  "kapat": "close",
  "aç": "open",
  "Başlamak ücretsiz": "Free to start",
  "Finansal özgürlüğünüze": "Start your financial",
  "bugün başlayın": "freedom today",
  "Ücretsiz hesap oluşturun, kredi kartı gerekmez. İlk 30 gün premium özellikleri ücretsiz deneyin.": "Create a free account, no credit card required. Try premium features free for the first 30 days.",
  "Ücretsiz Hesap Oluştur →": "Create Free Account →",
  "Kredi kartı gerekmez": "No credit card required",
  "30 gün ücretsiz": "30 days free",
  "İstediğiniz an iptal": "Cancel anytime",
  "Gelir, gider, borç ve varlıklarınızı tek platformda yönetin. Finansal özgürlüğünüze bugün başlayın.": "Manage income, expenses, debt, and assets in one platform. Start your financial freedom today.",
  "Ürün": "Product",
  "Şirket": "Company",
  "Hakkımızda": "About",
  "Blog": "Blog",
  "Yasal": "Legal",
  "Gizlilik Politikası": "Privacy Policy",
  "Kullanım Koşulları": "Terms of Use",
  "KVKK": "KVKK",
  "Güvenlik Merkezi": "Security Center",
  "Uygulamayı İndir": "Download the App",
  "App Store'dan İndir": "Download on the App Store",
  "App Store'da": "On the App Store",
  "iOS için İndir": "Download for iOS",
  "Google Play'den İndir": "Get it on Google Play",
  "Google Play'de": "On Google Play",
  "Android için İndir": "Download for Android",
  "© 2026 BudgetAssist. Tüm hakları saklıdır.": "© 2026 BudgetAssist. All rights reserved.",
  "Gizlilik": "Privacy",
}

const translate = (language, key) => (language === "en" ? EN_TRANSLATIONS[key] ?? key : key)
const formatHeroTotal = (value, language) => `₺${Math.round(value).toLocaleString(language === "en" ? "en-US" : "tr-TR")},00`

function LanguageSwitch({ language, onChange, className = "" }) {
  return (
    <div className={`public-language-switch${className ? ` ${className}` : ""}`} role="group" aria-label={language === "en" ? "Language" : "Dil"}>
      {LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={language === option.code ? "is-active" : ""}
          onClick={() => onChange(option.code)}
          aria-pressed={language === option.code}
          aria-label={option.name}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function LandingPage({ onLogin, onSignup, onOpenPage, language = "tr", onLanguageChange, theme = "dark" }) {
  const [billing, setBilling] = useState("yearly")
  const [activeFeature, setActiveFeature] = useState(0)
  const [heroTotal, setHeroTotal] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const yearly = billing === "yearly"
  const navRef = useRef(null)
  const brandLogoSrc = theme === "light" ? BRAND_LOGO_LIGHT_SRC : BRAND_LOGO_DARK_SRC
  const activeFeatureData = FEATURES[activeFeature]
  const ActiveFeatureIcon = activeFeatureData.Icon
  const tx = (key) => translate(language, key)

  const planPrice = (m) => `₺${yearly ? Math.round(m * 0.8) : m}`
  const setLandingLanguage = (nextLanguage) => {
    onLanguageChange?.(nextLanguage)
  }

  const getFaqToggleLabel = (question, isOpen) => (
    language === "en"
      ? `${tx(question)} ${isOpen ? "close" : "open"}`
      : `${question} yanıtını ${isOpen ? "kapat" : "aç"}`
  )

  useEffect(() => {
    // Skip animation on mobile — show final value immediately to avoid React re-render cost
    if (window.matchMedia("(max-width: 768px)").matches) {
      setHeroTotal(HERO_TOTAL_AMOUNT)
      return
    }

    let frame = 0
    const startTime = performance.now()
    const duration = 2200

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setHeroTotal(HERO_TOTAL_AMOUNT * eased)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })

    const animateCounter = (el, target, prefix, suffix, isFloat) => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / 1600, 1)
        const e = 1 - Math.pow(1 - p, 3)
        el.textContent = prefix + (isFloat ? (e * target).toFixed(1) : Math.floor(e * target)) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          if (entry.target.classList.contains("lp-stats")) {
            const ss = entry.target.querySelectorAll("strong[data-count]")
            const defs = [
              [ss[0], 500, "", "K+", false],
              [ss[1], 12, "₺", "B+", false],
              [ss[2], 99, "%", ".9", false],
              [ss[3], 4.9, "", "/5", true],
            ]
            defs.forEach(([el, ...args]) => el && animateCounter(el, ...args))
          }
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    )
    document.querySelectorAll(".lp-reveal").forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className={`public-page lp2-page${menuOpen ? " nav-menu-open" : ""}`} style={{ fontFamily: FONT_BODY }}>

      {/* Mobile menu scrim + panel — outside nav to avoid backdrop-filter containing block */}
      <div className="public-nav-scrim" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <div className="public-nav-dropdown" aria-hidden={!menuOpen}>
        <div className="public-nav-dropdown-header">
          <button className="public-brand" onClick={() => { onSignup(); setMenuOpen(false) }} type="button" aria-label="BudgetAssist">
            <img className="public-brand-logo" src={brandLogoSrc} alt="BudgetAssist" style={{ width: 130 }} />
          </button>
          <button type="button" className="public-nav-dropdown-close" onClick={() => setMenuOpen(false)} aria-label={tx("Menüyü kapat")}>
            <IconX />
          </button>
        </div>
        <div className="public-nav-dropdown-links">
          <a href="#features" onClick={() => setMenuOpen(false)}>{tx("Özellikler")}</a>
          <a href="#plans" onClick={() => setMenuOpen(false)}>{tx("Planlar")}</a>
          <button type="button" onClick={() => { onOpenPage("security"); setMenuOpen(false) }}>{tx("Güvenlik")}</button>
          <button type="button" onClick={() => { onOpenPage("contact"); setMenuOpen(false) }}>{tx("İletişim")}</button>
        </div>
        <LanguageSwitch language={language} onChange={setLandingLanguage} className="is-mobile" />
        <div className="public-nav-dropdown-actions">
          <button onClick={() => { onLogin(); setMenuOpen(false) }} type="button" className="public-nav-dropdown-login">{tx("Giriş Yap")}</button>
          <button onClick={() => { onSignup(); setMenuOpen(false) }} type="button" style={{ ...btnPrimary, width: "100%" }}>
            {tx("Hemen Başla")}
          </button>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className={`public-nav lp2-nav${menuOpen ? " is-menu-open" : ""}`} ref={navRef}>
        <button className="public-brand" onClick={onSignup} type="button" aria-label="BudgetAssist">
          <img className="public-brand-logo" src={brandLogoSrc} alt="BudgetAssist" />
        </button>
        <div className="public-nav-links" aria-label={tx("Navigasyon")}>
          <a href="#features">{tx("Özellikler")}</a>
          <a href="#plans">{tx("Planlar")}</a>
          <button type="button" onClick={() => onOpenPage("security")}>{tx("Güvenlik")}</button>
          <button type="button" onClick={() => onOpenPage("contact")}>{tx("İletişim")}</button>
        </div>
        <div className="public-nav-actions">
          <LanguageSwitch language={language} onChange={setLandingLanguage} />
          <button onClick={onLogin} type="button" className="public-link-button">{tx("Giriş Yap")}</button>
          <button onClick={onSignup} type="button" style={{ ...btnPrimary, padding: "10px 22px" }}>
            {tx("Hemen Başla")}
          </button>
        </div>
        <button
          type="button"
          className="public-nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? tx("Menüyü kapat") : tx("Menüyü aç")}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <IconX /> : <IconMenu />}
        </button>
      </nav>

      <main>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="lp2-hero">
          <div className="lp2-hero-orb lp2-orb-a" aria-hidden="true" />
          <div className="lp2-hero-orb lp2-orb-b" aria-hidden="true" />
          <div className="lp2-hero-orb lp2-orb-c" aria-hidden="true" />

          <div className="lp2-hero-inner">
            <div className="lp2-hero-text lp-enter">
              <div className="lp2-kicker">
                <span className="lp2-kicker-dot" />
                <span>{tx("Yeni: AI Finans Koçu v2.0 · Varlık & Borç Takibi · Kredi Kartı Yönetimi")}</span>
              </div>

              <h1>
                {tx("Paranızı")}<br />
                <em className="lp2-shimmer">{tx("akıllıca")}</em><br />
                <span>{tx("yönetin.")}</span>
              </h1>

              <p>{tx("Gelir, gider, borç, varlık ve yatırımlarınızı tek platformda takip edin. AI destekli analizlerle finansal hedeflerinize çok daha hızlı ulaşın.")}</p>

              <div className="lp2-hero-actions">
                <button onClick={onSignup} type="button" style={{ ...btnPrimary, padding: "15px 30px", fontSize: 14 }}>
                  {tx("Ücretsiz Başla →")}
                </button>
                <button onClick={onLogin} type="button" style={{ ...btnGhost, padding: "15px 30px", fontSize: 14 }}>
                  {tx("Giriş Yap")}
                </button>
              </div>

              <div className="lp2-social-proof">
                <div className="lp2-avatars">
                  {["ZK", "MD", "AŞ", "KB", "TE"].map((a) => <span key={a}>{a}</span>)}
                </div>
                <div>
                  <div className="lp2-stars">★★★★★</div>
                  <span>{tx("47.000+ kullanıcı · 4.9/5 puan")}</span>
                </div>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="lp2-hero-visual lp-enter" style={{ animationDelay: "200ms" }}>
              <div className="lp2-hero-3d-stage" aria-hidden="true">
                <div className="lp2-coin-stack-3d">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <b style={{ fontFamily: FONT_MONO }}>₺</b>
                </div>
                <div className="lp2-terminal-3d">
                  <span className="lp2-terminal-screen">
                    <b style={{ fontFamily: FONT_MONO }}>₺18.5K</b>
                    <i />
                  </span>
                  <span className="lp2-terminal-chip" />
                  <span className="lp2-terminal-keypad">
                    <i /><i /><i /><i /><i /><i />
                  </span>
                </div>
                <div className="lp2-card-stack-3d">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="lp2-data-ribbon-3d">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="lp2-dash glass-card">
                {/* Chrome bar */}
                <div className="lp2-dash-chrome">
                  <span /><span /><span />
                  <span className="lp2-dash-url">budgetassist.app</span>
                </div>

                {/* Top bar */}
                <div className="lp2-dash-topbar">
                  <div>
                    <small>{tx("Toplam Varlık")}</small>
                    <strong
                      className="lp2-dash-total"
                      style={{ fontFamily: FONT_MONO }}
                      aria-label={tx("Toplam varlık 284.750 Türk lirası")}
                    >
                      {formatHeroTotal(heroTotal, language)}
                    </strong>
                  </div>
                  <div className="lp2-dash-delta">
                    <span>↑</span>
                    <span>{tx("+%4.8 bu ay")}</span>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="lp2-dash-chart">
                  {[28, 36, 44, 38, 54, 62, 58, 70, 80, 74, 88, 96].map((h, i) => (
                    <i key={i} style={{ height: `${h}%`, animationDelay: `${600 + i * 60}ms` }} />
                  ))}
                  <svg viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="lp2ChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4edea3" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      className="lp2-chart-area"
                      d={HERO_CHART_AREA}
                    />
                    <path
                      className="lp2-chart-line"
                      d={HERO_CHART_TREND}
                    />
                  </svg>
                </div>

                {/* Modules row */}
                <div className="lp2-dash-modules">
                  <div className="lp2-dash-mod">
                    <span style={{ color: S.green }}>◈</span>
                    <div>
                      <small>{tx("Kredi Kartı")}</small>
                      <b style={{ fontFamily: FONT_MONO }}>₺12.340</b>
                    </div>
                  </div>
                  <div className="lp2-dash-mod">
                    <span style={{ color: S.cyan }}>⊙</span>
                    <div>
                      <small>{tx("Borçlar")}</small>
                      <b style={{ fontFamily: FONT_MONO }}>₺4.800</b>
                    </div>
                  </div>
                  <div className="lp2-dash-mod">
                    <span style={{ color: S.amber }}>◉</span>
                    <div>
                      <small>{tx("Hedef")}</small>
                      <b style={{ fontFamily: FONT_MONO }}>%68</b>
                    </div>
                  </div>
                  <div className="lp2-dash-mod">
                    <span style={{ color: "#ffb3af" }}>⊞</span>
                    <div>
                      <small>{tx("Varlıklar")}</small>
                      <b style={{ fontFamily: FONT_MONO }}>₺240K</b>
                    </div>
                  </div>
                </div>

                {/* Transactions */}
                <div className="lp2-dash-txs">
                  {[
                    { icon: "↗", label: "Maaş", date: "Bugün", amt: "+₺18.500", color: S.green },
                    { icon: "▽", label: "Kira", date: "Dün", amt: "-₺4.200", color: "#ffb3af" },
                    { icon: "▽", label: "Netflix", date: "3 gün önce", amt: "-₺89", color: "#ffb3af" },
                  ].map((tx) => (
                    <div className="lp2-dash-tx" key={tx.label}>
                      <span style={{ color: tx.color, background: `${tx.color}18` }}>{tx.icon}</span>
                      <div>
                        <b>{translate(language, tx.label)}</b>
                        <small>{translate(language, tx.date)}</small>
                      </div>
                      <em style={{ color: tx.color, fontFamily: FONT_MONO }}>{tx.amt}</em>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              <div className="lp2-float lp2-float-ai glass-card">
                <div className="lp2-float-ai-head">
                  <span style={{ color: S.green }}>✦</span>
                  <strong>{tx("AI Koç")}</strong>
                </div>
                <p>{language === "en" ? "You can reduce subscription expenses by " : "Bu ay abonelik giderlerini "}<b style={{ color: S.green }}>%23</b>{language === "en" ? " this month." : " azaltabilirsiniz."}</p>
                <div className="lp2-float-ai-bar">
                  <i style={{ width: "77%" }} />
                </div>
              </div>

              <div className="lp2-float lp2-float-card glass-card">
                <small>Garanti BBVA •••• 4821</small>
                <div className="lp2-float-card-limit">
                  <span>{tx("Limit Kullanımı")}</span>
                  <b style={{ color: S.cyan, fontFamily: FONT_MONO }}>%42</b>
                </div>
                <div className="lp2-float-card-bar">
                  <i style={{ width: "42%", background: S.cyan }} />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="lp2-scroll-hint" aria-hidden="true">
            <span />
          </div>
        </section>

        {/* ══ LOGOS ═════════════════════════════════════════════════════════ */}
        <div className="lp2-logos lp-reveal">
          <span>{tx("Desteklenen finansal kurumlar")}</span>
          <div className="lp2-logos-row">
            {["Ziraat Bankası", "Garanti BBVA", "İş Bankası", "Yapı Kredi", "Akbank", "Halkbank"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
        <section className="lp2-how lp-reveal">
          <div className="lp2-section-head">
            <span className="lp2-label">{tx("Nasıl Çalışır?")}</span>
            <h2>{tx("Finansal kontrolü")}<br /><em>{tx("3 adımda kurun")}</em></h2>
            <p>{tx("Dağınık işlem, hedef ve ödeme bilgilerini karar alabileceğiniz sade bir akışa çevirin.")}</p>
          </div>

          <div className="lp2-how-grid">
            {HOW_IT_WORKS.map(({ Icon, step, title, desc, stat }) => (
              <article className="glass-card lp2-how-card" key={title}>
                <span className="lp2-how-step" style={{ fontFamily: FONT_MONO }}>{step}</span>
                <div className="lp2-how-icon">
                  <Icon />
                </div>
                <h3>{tx(title)}</h3>
                <p>{tx(desc)}</p>
                <strong style={{ fontFamily: FONT_MONO }}>{tx(stat)}</strong>
              </article>
            ))}
          </div>
        </section>

        {/* ══ FEATURES ══════════════════════════════════════════════════════ */}
        <section className="lp2-features" id="features">
          <div className="lp2-section-head lp-reveal">
            <span className="lp2-label">{tx("8 Güçlü Özellik")}</span>
            <h2>{tx("Her finansal ihtiyacınız için")}<br /><em>{tx("tek platform")}</em></h2>
            <p>{tx("Sıradan bir bütçe uygulaması değil — tam kapsamlı bir finansal kontrol merkezi.")}</p>
          </div>

          <div className="lp2-feat-layout lp-reveal">
            {/* Left: feature list */}
            <div className="lp2-feat-list">
              {FEATURES.map((f, i) => (
                <button
                  key={f.title}
                  type="button"
                  className={`lp2-feat-item${activeFeature === i ? " is-active" : ""}`}
                  onClick={() => setActiveFeature(i)}
                >
                  <span className="lp2-feat-icon" style={{ color: f.color, background: `${f.color}18` }}>
                    <f.Icon />
                  </span>
                  <div>
                    <div className="lp2-feat-title">
                      {tx(f.title)}
                      {f.new && <span className="lp2-new-badge">{tx("Yeni")}</span>}
                    </div>
                    <div className="lp2-feat-tag">{tx(f.tag)}</div>
                  </div>
                  <span className="lp2-feat-arrow">›</span>
                </button>
              ))}
            </div>

            {/* Right: feature detail */}
            <div className="lp2-feat-detail glass-card">
              <div className="lp2-feat-detail-icon" style={{
                color: activeFeatureData.color,
                background: `${activeFeatureData.color}18`,
              }}>
                <ActiveFeatureIcon />
              </div>
              <div className="lp2-feat-detail-tag">
                {activeFeatureData.new && <span className="lp2-new-badge">{tx("Yeni")}</span>}
                <span>{tx(activeFeatureData.tag)}</span>
              </div>
              <h3>{tx(activeFeatureData.title)}</h3>
              <p>{tx(activeFeatureData.desc)}</p>

              {/* Visual preview per feature */}
              <div className="lp2-feat-preview">
                {activeFeature === 0 && (
                  <div className="lp2-preview-txs">
                    {[
                      { l: "Maaş Ödemesi", a: "+₺18.500", c: S.green },
                      { l: "Market", a: "-₺420", c: "#ffb3af" },
                      { l: "Elektrik", a: "-₺380", c: "#ffb3af" },
                      { l: "Kira Geliri", a: "+₺6.000", c: S.green },
                    ].map((tx) => (
                      <div className="lp2-prev-tx" key={tx.l}>
                        <span>{translate(language, tx.l)}</span>
                        <b style={{ color: tx.c, fontFamily: FONT_MONO }}>{tx.a}</b>
                      </div>
                    ))}
                  </div>
                )}
                {activeFeature === 1 && (
                  <div className="lp2-preview-ai">
                    <div className="lp2-ai-bubble lp2-ai-bubble-in">
                      <span>✦</span>
                      <p>{tx("Bu ay yemek harcamanız %34 arttı. Geçen ay ortalama ₺2.100 harcadınız.")}</p>
                    </div>
                    <div className="lp2-ai-bubble lp2-ai-bubble-in" style={{ animationDelay: "0.3s" }}>
                      <span>✦</span>
                      <p>{language === "en" ? "Netflix, Spotify, and 3 subscriptions overlap. Monthly savings of " : "Netflix, Spotify ve 3 aboneliğiniz çakışıyor — aylık "}<b style={{ color: S.green }}>₺340{language === "en" ? "" : " tasarruf"}</b>{language === "en" ? " are possible." : " mümkün."}</p>
                    </div>
                  </div>
                )}
                {activeFeature === 2 && (
                  <div className="lp2-preview-chart">
                    {[
                      ["Oca", 82, "₺18K"],
                      ["Şub", 65, "₺14K"],
                      ["Mar", 91, "₺22K"],
                      ["Nis", 74, "₺17K"],
                      ["May", 88, "₺21K"],
                      ["Haz", 96, "₺24K"],
                    ].map(([m, h, value]) => (
                      <div key={m} className="lp2-prev-bar-wrap" style={{ "--bar-height": `${h}%` }}>
                        <span className="lp2-prev-bar-value" style={{ fontFamily: FONT_MONO }}>{value}</span>
                        <div className="lp2-prev-bar-rail">
                          <div className="lp2-prev-bar" />
                        </div>
                        <span className="lp2-prev-month">{tx(m)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeFeature === 3 && (
                  <div className="lp2-preview-cards">
                    {[
                      { bank: "Garanti BBVA", no: "•••• 4821", used: 42, color: S.cyan },
                      { bank: "Yapı Kredi", no: "•••• 7392", used: 18, color: S.green },
                    ].map((c) => (
                      <div key={c.bank} className="lp2-prev-card">
                        <div className="lp2-prev-card-top">
                          <span>{c.bank}</span>
                          <small style={{ fontFamily: FONT_MONO }}>{c.no}</small>
                        </div>
                        <div className="lp2-prev-card-bar">
                          <i style={{ width: `${c.used}%`, background: c.color }} />
                        </div>
                        <div className="lp2-prev-card-bottom">
                          <small>{tx("Limit kullanımı")}</small>
                          <b style={{ color: c.color }}>%{c.used}</b>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeFeature === 4 && (
                  <div className="lp2-preview-debts">
                    {[
                      { name: "Ahmet'e borçlu", amt: "₺1.200", due: "15 Mayıs", c: "#ffb3af" },
                      { name: "Zeynep'ten alacak", amt: "₺850", due: "22 Mayıs", c: S.green },
                      { name: "Kira borcum", amt: "₺4.200", due: "1 Haziran", c: "#ffb3af" },
                    ].map((d) => (
                      <div key={d.name} className="lp2-prev-debt">
                        <div>
                          <b>{translate(language, d.name)}</b>
                          <small>{translate(language, d.due)}</small>
                        </div>
                        <span style={{ color: d.c, fontFamily: FONT_MONO }}>{d.amt}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeFeature === 5 && (
                  <div className="lp2-preview-recurring">
                    {[
                      { name: "Kira", period: "Her ay 1'i", amt: "₺4.200" },
                      { name: "Netflix", period: "Her ay 15'i", amt: "₺89" },
                      { name: "İnternet", period: "Her ay 20'si", amt: "₺320" },
                    ].map((r) => (
                      <div key={r.name} className="lp2-prev-recurring">
                        <div className="lp2-prev-rec-icon">⟲</div>
                        <div>
                          <b>{translate(language, r.name)}</b>
                          <small>{translate(language, r.period)}</small>
                        </div>
                        <span style={{ fontFamily: FONT_MONO }}>{r.amt}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeFeature === 6 && (
                  <div className="lp2-preview-goals">
                    {[
                      { name: "Tatil Fonu", pct: 68, color: S.cyan },
                      { name: "Araba Birikikim", pct: 34, color: S.green },
                      { name: "Acil Durum Fonu", pct: 90, color: S.amber },
                    ].map((g) => (
                      <div key={g.name} className="lp2-prev-goal">
                        <div className="lp2-prev-goal-top">
                          <span>{translate(language, g.name)}</span>
                          <b style={{ color: g.color }}>%{g.pct}</b>
                        </div>
                        <div className="lp2-prev-goal-bar">
                          <i style={{ width: `${g.pct}%`, background: g.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeFeature === 7 && (
                  <div className="lp2-preview-receipts">
                    {[
                      { store: "Migros", date: "3 May", amt: "₺420,50", tag: "Market" },
                      { store: "Şok Market", date: "1 May", amt: "₺188,00", tag: "Market" },
                      { store: "Teknosa", date: "28 Nis", amt: "₺2.499,00", tag: "Elektronik" },
                    ].map((r) => (
                      <div key={r.store} className="lp2-prev-receipt">
                        <div className="lp2-prev-receipt-icon">⊞</div>
                        <div>
                          <b>{r.store}</b>
                          <small>{translate(language, r.date)}</small>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <b style={{ fontFamily: FONT_MONO }}>{r.amt}</b>
                          <small className="lp2-receipt-tag">{translate(language, r.tag)}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onSignup}
                className="lp2-feat-cta"
                style={{ color: activeFeatureData.color, borderColor: `${activeFeatureData.color}40` }}
              >
                {language === "en" ? `Explore ${tx(activeFeatureData.title)} →` : `${activeFeatureData.title} özelliğini keşfet →`}
              </button>
            </div>
          </div>
        </section>

        {/* ══ SECURITY STRIP ════════════════════════════════════════════════ */}
        <section className="lp2-security-strip lp-reveal">
          <div className="lp2-security-copy">
            <span className="lp2-label">{tx("Güvenlik")}</span>
            <h2>{tx("Finans verileriniz için sakin ve güvenli bir alan.")}</h2>
            <p>{tx("BudgetAssist, kişisel finans verilerinizi anlaşılır kontroller ve güvenli hesap deneyimiyle yönetmeniz için tasarlandı.")}</p>
            <button type="button" onClick={() => onOpenPage("security")}>
              {tx("Güvenlik detaylarını incele →")}
            </button>
          </div>
          <div className="lp2-security-grid">
            {SECURITY_POINTS.map(({ Icon, title, desc }) => (
              <div className="lp2-security-point" key={title}>
                <span><Icon /></span>
                <div>
                  <strong>{tx(title)}</strong>
                  <p>{tx(desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════════════════════ */}
        <div className="lp-stats lp2-stats lp-reveal">
          {STATS.map(({ value, label, color }) => (
            <div key={label}>
              <strong data-count className="finance-number" style={{ color }}>{value}</strong>
              <span>{tx(label)}</span>
            </div>
          ))}
        </div>

        {/* ══ TESTIMONIALS ══════════════════════════════════════════════════ */}
        <section className="lp2-testimonials lp-reveal">
          <div className="lp2-section-head" style={{ marginBottom: "2.5rem" }}>
            <span className="lp2-label">{tx("Kullanıcı Yorumları")}</span>
            <h2>{tx("47.000+ kişi zaten kullanıyor")}</h2>
          </div>
          <div className="lp2-testi-marquee" aria-label={tx("Kullanıcı yorumları")}>
            <div className="lp2-testi-track">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <article className="glass-card lp2-testi-card" key={`${t.name}-${i}`} aria-hidden={i >= TESTIMONIALS.length}>
                  <div className="lp2-testi-stars">★★★★★</div>
                  <p>"{tx(t.text)}"</p>
                  <div className="lp2-testi-author">
                    <span className="lp2-testi-avatar">{t.avatar}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <small>{tx(t.role)}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ═══════════════════════════════════════════════════════ */}
        <section className="lp2-pricing lp-reveal" id="plans">
          <div className="lp2-section-head" style={{ marginBottom: "0.5rem" }}>
            <span className="lp2-label">{tx("Fiyatlandırma")}</span>
            <h2>{tx("Planınızı seçin")}</h2>
            <p>{tx("Ücretsiz başlayın, ihtiyaç büyüdükçe yükseltin.")}</p>
          </div>

          <div className="lp2-billing-toggle" role="group" aria-label={tx("Fatura dönemi")}>
            <button type="button" className={billing === "monthly" ? "is-active" : ""} onClick={() => setBilling("monthly")}>{tx("Aylık")}</button>
            <button type="button" className={billing === "yearly" ? "is-active" : ""} onClick={() => setBilling("yearly")}>
              {tx("Yıllık")} <small>-%20</small>
            </button>
          </div>

          <div className="lp2-plan-grid">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`lp2-plan-card glass-card${plan.tone === "premium" ? " lp2-plan-premium" : ""}${plan.tone === "standard" ? " lp2-plan-standard" : ""}`}
              >
                {plan.tone !== "muted" && (
                  <div className={`lp2-plan-badge${plan.tone === "premium" ? " is-premium" : ""}`}>{tx(plan.note)}</div>
                )}
                <h3>{tx(plan.name)}</h3>
                <div className="lp2-plan-price">
                  <strong style={{ fontFamily: FONT_MONO }}>{planPrice(plan.monthly)}</strong>
                  <span>{tx("/ay")}</span>
                </div>
                {yearly && plan.monthly > 0 && (
                  <small className="lp2-plan-saving">{tx("Yıllık ödemede")} ₺{Math.round(plan.monthly * 12 * 0.2)} {tx("tasarruf")}</small>
                )}
                <ul className="lp2-plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span>✓</span>
                      {tx(f)}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={onSignup}
                  className={plan.tone === "premium" ? "lp2-plan-btn-primary" : "lp2-plan-btn-secondary"}
                >
                  {tx(plan.action)}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
        <section className="lp2-faq lp-reveal">
          <div className="lp2-section-head" style={{ marginBottom: "2rem" }}>
            <span className="lp2-label">{tx("Sık Sorulan Sorular")}</span>
            <h2>{tx("Başlamadan önce")}<br /><em>{tx("aklınızdaki sorular")}</em></h2>
          </div>
          <div className="lp2-faq-grid">
            {FAQS.map(({ q, a }, index) => {
              const isOpen = openFaqIndex === index
              const answerId = `lp2-faq-answer-${index}`

              return (
                <article className={`glass-card lp2-faq-item${isOpen ? " is-open" : ""}`} key={q}>
                  <h3 className="lp2-faq-question">
                    <span className="lp2-faq-toggle-text">{tx(q)}</span>
                    <button
                      type="button"
                      className="lp2-faq-toggle"
                      aria-label={getFaqToggleLabel(q, isOpen)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <span className="lp2-faq-icon" aria-hidden="true">
                        <IconChevronDown />
                      </span>
                    </button>
                  </h3>
                  <div className="lp2-faq-answer" id={answerId}>
                    <div className="lp2-faq-answer-inner">
                      <p>{tx(a)}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* ══ FINAL CTA ═════════════════════════════════════════════════════ */}
        <section className="lp2-cta lp-reveal">
          <div className="lp2-cta-grid" aria-hidden="true" />
          <div className="lp2-cta-glow" aria-hidden="true" />
          <span className="lp2-label" style={{ position: "relative" }}>{tx("Başlamak ücretsiz")}</span>
          <h2 style={{ position: "relative" }}>
            {tx("Finansal özgürlüğünüze")}<br />
            <em>{tx("bugün başlayın")}</em>
          </h2>
          <p style={{ position: "relative" }}>{tx("Ücretsiz hesap oluşturun, kredi kartı gerekmez. İlk 30 gün premium özellikleri ücretsiz deneyin.")}</p>
          <button onClick={onSignup} type="button" style={{ ...btnPrimary, padding: "17px 40px", fontSize: 15, position: "relative" }}>
            {tx("Ücretsiz Hesap Oluştur →")}
          </button>
          <div className="lp2-cta-features" style={{ position: "relative" }}>
            {["Kredi kartı gerekmez", "30 gün ücretsiz", "İstediğiniz an iptal"].map((f) => (
              <span key={f}><b style={{ color: S.green }}>✓</b> {tx(f)}</span>
            ))}
          </div>
        </section>

      </main>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="public-footer lp2-footer">
        <div className="lp2-footer-inner">
          <div className="lp2-footer-top">
            <div className="lp2-footer-brand">
              <img className="public-brand-logo" src={brandLogoSrc} alt="BudgetAssist" />
              <p>{tx("Gelir, gider, borç ve varlıklarınızı tek platformda yönetin. Finansal özgürlüğünüze bugün başlayın.")}</p>
              <div className="lp2-footer-social">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="lp2-footer-social-link">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="lp2-footer-social-link">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="lp2-footer-social-link">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            <div className="lp2-footer-col">
              <strong>{tx("Ürün")}</strong>
              <a href="#features" className="lp2-footer-link">{tx("Özellikler")}</a>
              <a href="#plans" className="lp2-footer-link">{tx("Planlar")}</a>
              <button type="button" className="lp2-footer-link" onClick={onSignup}>{tx("AI Finansal Koç")}</button>
              <button type="button" className="lp2-footer-link" onClick={onSignup}>{tx("Kredi Kartı Takibi")}</button>
              <button type="button" className="lp2-footer-link" onClick={onSignup}>{tx("Borç Yönetimi")}</button>
            </div>
            <div className="lp2-footer-col">
              <strong>{tx("Şirket")}</strong>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("contact")}>{tx("Hakkımızda")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("contact")}>{tx("Blog")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("contact")}>{tx("İletişim")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("security")}>{tx("Güvenlik")}</button>
            </div>
            <div className="lp2-footer-col">
              <strong>{tx("Yasal")}</strong>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("privacy")}>{tx("Gizlilik Politikası")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("terms")}>{tx("Kullanım Koşulları")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("privacy")}>{tx("KVKK")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("security")}>{tx("Güvenlik Merkezi")}</button>
            </div>
            <div className="lp2-footer-col">
              <strong>{tx("Uygulamayı İndir")}</strong>
              <a href="#" className="lp2-footer-app-btn" onClick={(e) => e.preventDefault()} aria-label={tx("App Store'dan İndir")}>
                <img src="/assets/Apple_logo_grey.svg" alt="" aria-hidden="true" className="lp2-footer-app-logo lp2-footer-app-logo-apple" />
                <div>
                  <small>{tx("App Store'da")}</small>
                  <b>{tx("iOS için İndir")}</b>
                </div>
              </a>
              <a href="#" className="lp2-footer-app-btn" onClick={(e) => e.preventDefault()} aria-label={tx("Google Play'den İndir")}>
                <img src="/assets/google_play.svg" alt="" aria-hidden="true" className="lp2-footer-app-logo lp2-footer-app-logo-play" />
                <div>
                  <small>{tx("Google Play'de")}</small>
                  <b>{tx("Android için İndir")}</b>
                </div>
              </a>
            </div>
          </div>
          <div className="lp2-footer-bottom">
            <small>{tx("© 2026 BudgetAssist. Tüm hakları saklıdır.")}</small>
            <div className="lp2-footer-bottom-links">
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("privacy")}>{tx("Gizlilik")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("terms")}>{tx("Kullanım Koşulları")}</button>
              <button type="button" className="lp2-footer-link" onClick={() => onOpenPage("security")}>{tx("Güvenlik")}</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
