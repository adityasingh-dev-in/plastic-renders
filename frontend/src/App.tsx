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