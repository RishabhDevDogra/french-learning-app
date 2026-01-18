import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reading from './pages/Reading'

function App() {
  return (
    <div className="bg-cream min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reading/:id" element={<Reading />} />
      </Routes>
    </div>
  )
}

export default App
