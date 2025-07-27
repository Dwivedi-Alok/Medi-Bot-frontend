import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- updated import
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Brain, 
  Clock, 
  Users, 
  Star,
  Heart,
  Activity,
  Stethoscope,
  Zap,
  ChevronDown,
  Play,
  Link
} from 'lucide-react';

const HeroPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // <-- add this

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    navigate('/MediBot'); // <-- navigate to your chatbot route
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced medical knowledge base with instant, accurate responses"
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Your privacy is protected with enterprise-grade security"
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Get medical information anytime, anywhere you need it"
    },
    {
      icon: Users,
      title: "Expert Verified",
      description: "Information backed by medical professionals and research"
    }
  ];

  const stats = [
    { number: "10K+", label: "Questions Answered" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Availability" },
    { number: "5⭐", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        
        {/* Interactive cursor glow */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-slate-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-gray-200" />
            </div>
            <span className="text-2xl font-bold text-gray-100">MediBot</span>
          </div>
          <button 
            onClick={handleGetStarted}
            className="text-gray-400 hover:text-gray-100 transition-colors font-medium"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm font-medium">Powered by Advanced AI</span>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6 leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-gray-400 via-slate-300 to-gray-500 bg-clip-text text-transparent animate-gradient">
                Medical Assistant
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get instant, accurate medical information powered by AI. 
              <span className="block mt-2">
                <span className="text-gray-300">Ask questions</span>, 
                <span className="text-slate-300"> get insights</span>, and 
                <span className="text-gray-200"> stay informed</span> about your health.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-gray-800 to-slate-700 hover:from-gray-700 hover:to-slate-600 text-gray-100 font-semibold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center space-x-3 border border-gray-600"
              >
                <span className="text-lg">Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-black/40 backdrop-blur-sm border border-gray-700 hover:bg-black/60 text-gray-200 font-semibold px-8 py-4 rounded-2xl transition-all flex items-center space-x-3">
                <Play className="w-5 h-5" />
                <span className="text-lg">Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`transform transition-all duration-1000 delay-${index * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-black/60 transition-all">
                    <div className="text-3xl font-bold text-gray-100 mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-1000 delay-${(index + 4) * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-black/60 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-slate-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-gray-200" />
                  </div>
                  <h3 className="text-gray-100 font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Medical Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <Heart className="absolute top-1/4 left-1/6 w-6 h-6 text-gray-600/40 animate-float" />
            <Stethoscope className="absolute top-1/3 right-1/6 w-8 h-8 text-slate-600/40 animate-float animation-delay-1000" />
            <Activity className="absolute bottom-1/3 left-1/4 w-7 h-7 text-gray-700/40 animate-float animation-delay-2000" />
            <Zap className="absolute bottom-1/4 right-1/3 w-5 h-5 text-slate-500/40 animate-float animation-delay-3000" />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center text-gray-500 animate-bounce">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-lg border border-gray-700 rounded-3xl p-12">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust MediBot for their medical information needs. 
              Experience the future of healthcare assistance today.
            </p>
            <button
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-gray-800 to-slate-700 hover:from-gray-700 hover:to-slate-600 text-gray-100 font-semibold px-10 py-5 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl text-xl flex items-center space-x-3 mx-auto border border-gray-600"
            >
              <span>Start Chatting Now</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-400 { transition-delay: 0.4s; }
        .delay-600 { transition-delay: 0.6s; }
        .delay-800 { transition-delay: 0.8s; }
        .delay-1000 { transition-delay: 1s; }
        .delay-1200 { transition-delay: 1.2s; }
        .delay-1400 { transition-delay: 1.4s; }
        .delay-1600 { transition-delay: 1.6s; }
      `}</style>
    </div>
  );
};

export default HeroPage;