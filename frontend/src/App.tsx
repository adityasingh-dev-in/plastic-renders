import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/Home/LandingPage"
import PageLayout from "./layout/pageLayout"

const App = () => {
  return (
    <Routes>
      <Route element={<PageLayout/>}>
        <Route path="/" element={<LandingPage/>}/>
      </Route>
    </Routes>
  )
}

export default App

// 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