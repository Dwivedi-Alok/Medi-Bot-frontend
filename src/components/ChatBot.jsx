import React, { useEffect, useState, useRef } from 'react'
import { Send, Bot, User, Sparkles, MessageCircle, Activity, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

function ChatBot() {
  const [input, setInput] = useState('');
  const [message, setMsg] = useState([{
    id: 1,
    text: "Hey there! I'm your AI assistant. How can I help you today? ✨",
    sender: 'Medi-bot',
    timestamp: new Date()
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [apiStatus, setApiStatus] = useState('checking');
  const [error, setError] = useState(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [message]);
  
  const API_URI = "https://kmkk30x9-5000.inc1.devtunnels.ms";

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_URI}/api/health`);
      const data = await response.json();
      if (response.ok && data.status === 'healthy') {
        setApiStatus('online');
        setError(null);
      } else {
        setApiStatus('error');
        setError('API is not responding properly');
      }
    } catch (err) {
      setApiStatus('offline');
      setError('API is not responding properly');
      console.error('API Health Check Failed:', err);
    }
  };

  const loadSuggestions = async () => {
    try {
      const response = await fetch(`${API_URI}/api/suggestions`);
      const data = await response.json();
      if (response.ok && data.status === 'ok') {
        setSuggestions(data.suggestions || []);
      }
    } catch (err) {
      console.log("error in console: \n", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = {
      id: Date.now(),
      message: input,
      sender: 'user',
      timestamp: new Date(),
      sources: [],
    };
    setMsg(prev => [...prev, { ...userMsg, text: input }]);
    setInput('');
    setIsTyping(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URI}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMsg),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'failed to get response from medibot');
      }
      const botMsg = {
        id: Date.now() + 1,
        text: data.response || 'I apologize, but I received an empty response',
        sender: 'Medi-bot',
        timestamp: new Date(),
        sources: data.sources || [],
      };
      setMsg(prev => [...prev, botMsg]);
    } catch (err) {
      console.log('Chat api Error:', err);
      const errorMsg = {
        id: Date.now() + 1,
        text: `😒${err.message}. please try again or check if API server is running.`,
        sender: 'Medi-bot',
        timestamp: new Date(),
        sources: [],
        isError: true
      };
      setMsg(prev => [...prev, errorMsg]);
      setError(err.message);
    }
    finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMsg = (text) => {
    // Enhanced message formatting with better markdown support
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, content) => {
        const level = hashes.length;
        const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs'];
        return `<h${level} class="font-bold ${sizes[level-1] || 'text-sm'} text-gray-900 mb-2 mt-2">${content}</h${level}>`;
      })
      .replace(/\n/g, '<br>');
  };

  const StatusIndicator = () => {
    const statusConfig = {
      online: { color: 'bg-emerald-400', text: 'Online', icon: Activity, pulse: 'animate-pulse' },
      offline: { color: 'bg-red-400', text: 'Offline', icon: AlertCircle, pulse: '' },
      checking: { color: 'bg-amber-400', text: 'Checking', icon: Loader2, pulse: 'animate-spin' },
      error: { color: 'bg-red-400', text: 'Error', icon: AlertCircle, pulse: 'animate-pulse' }
    };
    const config = statusConfig[apiStatus] || statusConfig['offline'];
    const Icon = config.icon;

    return (
      <div className="flex items-center space-x-2 bg- px-3 py-1.5 rounded-full">
        <span className={`w-2 h-2 rounded-full ${config.color} ${config.pulse}`}></span>
        <Icon className={`w-4 h-4 text-gray-300 ${apiStatus === 'checking' ? 'animate-spin' : ''}`} />
        <span className="text-xs text-gray-300 font-medium">{config.text}</span>
      </div>
    );
  };

  const TypingIndicator = () => (
    <div className="mb-3 flex justify-start">
      <div className="max-w-xs px-4 py-3 rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-grey-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    checkApiHealth();
    loadSuggestions();
  }, []);

  return (
    <div className="flex flex-col  h-screen w-full">
      <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-black/50 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Medi-Bot</h2>
            <p className="text-xs text-gray-400">Your AI Medical Assistant</p>
          </div>
        </Link>
        <div className='mx-10 '>

        <StatusIndicator />
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {message.map((msg, index) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-sm lg:max-w-md xl:max-w-lg ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Message Bubble */}
              <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                msg.sender === 'user' 
                  ? 'bg-white text-gray-900 rounded-br-md' 
                  : msg.isError 
                    ? 'bg-red-50 border border-red-200 text-red-800 rounded-bl-md'
                    : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'
              }`}>
                <div 
                  className="text-sm leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: formatMsg(msg.text) }} 
                />
                
                {/* Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1 font-semibold flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12V4m0 0L3 9m9-5l9 5" /></svg>
                      Sources
                    </p>
                    <ul className="flex flex-col gap-2">
                      {msg.sources.map((source, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-900 shadow-sm"
                        >
                          <span>
                            {typeof source === 'object'
                              ? source.content || source.title || JSON.stringify(source)
                              : source}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Timestamp */}
                <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-700 bg-black/50 backdrop-blur-sm">
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={apiStatus !== 'online'}
            />
          </div>
          
          <button
            onClick={handleSend}
            className="relative group px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            disabled={!input.trim() || isTyping || apiStatus !== 'online'}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0.5 bg-gray-800 rounded-[10px] group-hover:bg-gray-700 transition-colors duration-300"></div>
            
            {/* Button content */}
            <div className="relative flex items-center gap-2">
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Send</span>
            </div>
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </button>
        </div>
      </div>

      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 3px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

export default ChatBot
