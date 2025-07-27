import React from 'react'
import ChatBot from '../components/chatbot'
import { StarBackground } from '../components/StarBackground'
import ThemeToggle from '../components/ThemeToggle'
import HeroPage from './HeroPage'

function Home() {
  return (
     <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* <ThemeToggle/>
        // 
        <ChatBot/> */}
        <StarBackground/>
        <HeroPage/>

     </div>
  )
}

export default Home