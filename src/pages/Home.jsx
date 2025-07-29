import React from 'react'

import { StarBackground } from '../components/StarBackground'

import HeroPage from './HeroPage'

function Home() {
  return (
     <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* 
        // 
        <ChatBot/> */}
        <StarBackground/>
        <HeroPage/>

     </div>
  )
}

export default Home