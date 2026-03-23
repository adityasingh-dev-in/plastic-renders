import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/Home/LandingPage"
import PageLayout from "./layout/pageLayout"
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy"
import TermsOfService from "./pages/Legal/TermsOfService"

const App = () => {
  return (
    <Routes>
      <Route element={<PageLayout/>}>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<TermsOfService/>}/>
      </Route>
    </Routes>
  )
}

export default App