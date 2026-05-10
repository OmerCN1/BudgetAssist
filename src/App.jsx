import { lazy, Suspense, useState, useEffect } from "react"
import { S, FONT_BODY, btnPrimary } from "./constants/theme"
import { useTheme } from "./hooks/useTheme"

const LandingPage = lazy(() => import("./components/auth/LandingPage"))
const PublicInfoPage = lazy(() => import("./components/auth/PublicInfoPage"))
const FullApp = lazy(() => import("./FullApp"))

export default function App() {
  const [mode, setMode] = useState(() => window.location.pathname === "/admin" ? "full" : "landing") // "landing" | "info" | "full"
  const [infoPage, setInfoPage] = useState("")
  const [authMode, setAuthMode] = useState("login")
  const { theme } = useTheme()

  // Deferred session check — load Supabase only after the page is idle
  useEffect(() => {
    const check = async () => {
      try {
        const { hasSupabaseConfig, supabase } = await import("./lib/supabase")
        if (!hasSupabaseConfig) return
        const { data } = await supabase.auth.getSession()
        if (data?.session) setMode("full")
      } catch { /* ignore */ }
    }

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(check, { timeout: 3000 })
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(check, 300)
    return () => clearTimeout(t)
  }, [])

  const openAuth = (mode) => { setAuthMode(mode); setMode("full") }
  const openPage = (page) => { setInfoPage(page); setMode("info") }

  if (mode === "full") {
    return (
      <Suspense fallback={<ShellMessage title="BudgetAssist" text="Yükleniyor..." />}>
        <FullApp
          initialAuthMode={authMode}
          onBackLanding={() => setMode("landing")}
          onOpenPage={openPage}
        />
      </Suspense>
    )
  }

  if (mode === "info") {
    return (
      <Suspense fallback={<ShellMessage title="Sayfa yükleniyor" text="Bilgi sayfası hazırlanıyor." />}>
        <PublicInfoPage
          page={infoPage}
          onBackLanding={() => setMode("landing")}
          onLogin={() => openAuth("login")}
          onSignup={() => openAuth("signup")}
          onOpenPage={openPage}
          theme={theme}
        />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<ShellMessage title="BudgetAssist" text="Ana sayfa hazırlanıyor." />}>
      <LandingPage
        onLogin={() => openAuth("login")}
        onSignup={() => openAuth("signup")}
        onOpenPage={openPage}
        theme={theme}
      />
    </Suspense>
  )
}

function ShellMessage({ title, text }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: S.bg, color: S.text, fontFamily: FONT_BODY, padding: 20 }}>
      <div style={{ textAlign: "center", background: S.card, border: `1px solid ${S.border}`, borderRadius: 16, padding: "28px 32px", width: "100%", maxWidth: 420 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{title}</div>
        <div style={{ color: S.muted, fontSize: 13, marginBottom: 14 }}>{text}</div>
        <button style={{ ...btnPrimary, opacity: 0.75, cursor: "default" }}>Lütfen bekleyin</button>
      </div>
    </div>
  )
}
