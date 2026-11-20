import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  Minus, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  MessageCircle, 
  PhoneCall,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { COMPANY } from '../../data/company';
import { formatINR } from '../../utils/formatters';
import { 
  ChatMessage, 
  sendChatMessageToGroq, 
  detectRecommendedPackages 
} from '../../services/aiChatService';

const STORAGE_KEY = 'vk_ai_chat_history_v1';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'assistant',
  text: `Namaste! 🙏 Welcome to **VK Vacations**.

I am your personal **VK AI Travel Concierge**, powered by ultra-fast Groq intelligence. 

How can I help you plan your dream vacation today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  recommendedPackages: [
    {
      title: "Magical Maldives Overwater Villa",
      slug: "/packages/magical-maldives-water-villa",
      price: 68000,
      duration: "4D / 3N",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80",
      isTemple: false
    },
    {
      title: "Arupadai Veedu Murugan Yatra",
      slug: "/temple-tours/arupadai-veedu-murugan-temples",
      price: 24500,
      duration: "6D / 5N",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80",
      isTemple: true
    }
  ]
};

const QUICK_PROMPTS = [
  "🏖️ Best Honeymoon Packages",
  "🕉️ South Indian Temple Tours",
  "🏔️ Kashmir 6D/5N Itinerary",
  "💰 Holiday packages under ₹50,000",
  "✈️ Dubai Luxury Family Trip"
];

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [INITIAL_MESSAGE];
    } catch {
      return [INITIAL_MESSAGE];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save conversation to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Session storage write error', e);
    }
  }, [messages]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowTooltip(false);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const chatHistory = [...messages, userMsg].slice(-8).map(m => ({
        role: m.sender as 'user' | 'assistant',
        content: m.text
      }));

      const replyText = await sendChatMessageToGroq(chatHistory);
      const recommendations = detectRecommendedPackages(query, replyText);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedPackages: recommendations
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `I apologize for the momentary delay. Our travel specialists are also available directly on **WhatsApp & Call at ${COMPANY.phone}** to curate your itinerary immediately!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Clear chat conversation history?")) {
      setMessages([INITIAL_MESSAGE]);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <>
      {/* ================================================================== */}
      {/* 1. FLOATING LAUNCHER BUTTON & AMBIENT GLOW DOCK                    */}
      {/* ================================================================== */}
      <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 pointer-events-auto">
        
        {/* Interactive Teaser Pill Banner */}
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md text-[#142238] px-4 py-3 rounded-2xl shadow-2xl border border-slate-200/90 max-w-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0866D9] via-[#00B8A9] to-[#FF8A38] p-0.5 shrink-0 flex items-center justify-center shadow-sm">
                <div className="w-full h-full bg-[#071B35] rounded-[10px] flex items-center justify-center">
                  <Sparkles size={16} className="text-[#FFC857] animate-pulse" />
                </div>
              </div>

              <div className="text-left cursor-pointer" onClick={() => setIsOpen(true)}>
                <span className="block text-[11px] font-heading font-black text-[#0866D9] uppercase tracking-wider">
                  VK AI Travel Concierge
                </span>
                <p className="text-xs text-slate-700 font-medium leading-snug">
                  Plan custom holidays & temple tours in seconds!
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                aria-label="Dismiss chat tooltip"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Launcher Trigger Button */}
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-15 h-15 rounded-full bg-gradient-to-tr from-[#0866D9] via-[#00B8A9] to-[#FF8A38] p-0.5 shadow-2xl shadow-blue-600/30 cursor-pointer flex items-center justify-center group focus:outline-none"
          aria-label={isOpen ? "Close AI Travel Concierge" : "Open VK Vacations AI Travel Concierge"}
        >
          {/* Animated Glow Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0866D9] via-[#00B8A9] to-[#FF8A38] opacity-70 blur-md group-hover:opacity-100 animate-pulse transition duration-500 pointer-events-none" />

          {/* Button Core */}
          <div className="relative w-full h-full bg-[#071B35] rounded-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={26} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat-icon"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Bot size={28} className="text-[#00B8A9] group-hover:text-white transition-colors" />
                  <span className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 border-2 border-[#071B35] rounded-full animate-ping" />
                  <span className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 border-2 border-[#071B35] rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

      </div>

      {/* ================================================================== */}
      {/* 2. CHATBOT WINDOW (MODAL DRAWER)                                  */}
      {/* ================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden text-[#142238]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#071B35] via-[#0A2540] to-[#071B35] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white p-0.5 shadow-md flex items-center justify-center shrink-0 border border-white/20">
                  <img 
                    src="/android-chrome-192x192.png" 
                    alt="VK Vacations AI" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-sm tracking-wide text-white">
                      VK AI Concierge
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Groq
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-semibold tracking-wide">
                      Online • Fast AI Advisor
                    </span>
                  </div>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear Conversation History"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Clear Chat"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Minimize Chat"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Quick Action Top Bar */}
            <div className="bg-[#EAF6FF] px-4 py-2 border-b border-blue-100 flex items-center justify-between text-[11px] shrink-0 text-[#0866D9]">
              <span className="font-medium flex items-center gap-1">
                <Sparkles size={12} className="text-[#0866D9]" />
                <span>Instant Travel Recommendations</span>
              </span>
              <a 
                href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`}
                className="font-bold hover:underline flex items-center gap-1"
              >
                <PhoneCall size={11} />
                <span>Call Desk</span>
              </a>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC] custom-scrollbar text-xs">
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0866D9] text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                    }`}
                  >
                    {/* Message Header for AI */}
                    {msg.sender === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-100 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        <Bot size={12} className="text-[#0866D9]" />
                        <span>VK Vacations Assistant</span>
                      </div>
                    )}

                    {/* Formatted Content */}
                    <div className="whitespace-pre-line font-sans space-y-1.5">
                      {msg.text.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-[9px] mt-1.5 text-right font-mono ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Recommended Package Cards Embedded inside AI Message */}
                  {msg.recommendedPackages && msg.recommendedPackages.length > 0 && (
                    <div className="mt-2.5 max-w-[92%] w-full space-y-2">
                      <span className="text-[10px] uppercase font-heading font-extrabold tracking-wider text-slate-400 block px-1">
                        Handpicked Package Match:
                      </span>
                      {msg.recommendedPackages.map((rec, rIdx) => (
                        <div
                          key={rIdx}
                          className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-[#0866D9]/50 transition-colors group"
                        >
                          <img
                            src={rec.image}
                            alt={rec.title}
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-heading font-bold text-xs text-[#071B35] block truncate group-hover:text-[#0866D9] transition-colors">
                              {rec.title}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                              <span>{rec.duration}</span>
                              <span>•</span>
                              <span className="font-bold text-[#0866D9]">From {formatINR(rec.price)}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <Link
                                to={rec.slug}
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1 text-[10px] font-heading font-bold text-[#0866D9] hover:underline"
                              >
                                <span>View Itinerary</span>
                                <ArrowRight size={10} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}

              {/* Animated Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 bg-white rounded-2xl p-3 border border-slate-200 shadow-xs w-fit">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0866D9] flex items-center justify-center">
                    <Bot size={14} className="animate-spin-slow" />
                  </div>
                  <div className="flex items-center gap-1 px-1">
                    <span className="w-2 h-2 rounded-full bg-[#0866D9] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#00B8A9] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#FF8A38] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium font-sans">
                    Thinking with Groq AI...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Recommendation Chips */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {QUICK_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-heading font-semibold bg-slate-100 hover:bg-[#EAF6FF] text-slate-700 hover:text-[#0866D9] border border-slate-200 transition-colors shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200/80 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about packages, prices, temples..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder-slate-400 focus:outline-none focus:border-[#0866D9] focus:bg-white transition-all disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-[#0866D9] hover:bg-[#064ea5] text-white flex items-center justify-center shrink-0 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Send Message"
                >
                  <Send size={15} />
                </button>
              </form>

              {/* Bottom Micro-Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
                <span>Powered by Groq Ultra-Fast AI</span>
                <a
                  href={`https://wa.me/${COMPANY.whatsappNumber}?text=Hello%20VK%20Vacations,%20I%20would%20like%20to%20connect%20with%20a%20travel%20expert.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <MessageCircle size={10} />
                  <span>WhatsApp Agent</span>
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
