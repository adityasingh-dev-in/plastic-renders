import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/Home/LandingPage"
import PageLayout from "./layout/pageLayout"

const PrivacyPolicy = lazy(() => import("./pages/Legal/PrivacyPolicy"))
const TermsOfService = lazy(() => import("./pages/Legal/TermsOfService"))

const App = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <Routes>
        <Route element={<PageLayout/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/privacy" element={<PrivacyPolicy/>}/>
          <Route path="/terms" element={<TermsOfService/>}/>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App