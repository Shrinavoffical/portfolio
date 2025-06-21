import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "../components/HomePage"
import StartProjectPage from "../components/StartProjectPage"
import ProjectDetailPage from "../components/ProjectDetailPage"
import "./globals.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start-project" element={<StartProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
