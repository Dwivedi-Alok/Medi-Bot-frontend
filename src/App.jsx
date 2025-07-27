import { useState } from 'react'
import Home from './pages/Home'
import HeroPage from './pages/HeroPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CallChatBot from './components/CallChatBot';  // <- FIXED CASE


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MediBot" element={<CallChatBot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
