import React from 'react'
import ChatBot from './ChatBot';
import { StarBackground } from './StarBackground'
import ThemeToggle from './ThemeToggle'

function CallChatBot() {
  return (
   <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
   <ThemeToggle/>
<StarBackground/>
    <ChatBot/>
   </div>
  )
}

export default CallChatBot