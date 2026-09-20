import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import "./ChatbotWidget.css";

const QUICK_ACTIONS = ["Services", "Pricing", "House Construction", "Interior Design", "Contact Us"];

const RESPONSES = [
  { keywords: ["service", "services", "offer"], reply: "We provide House Construction, Commercial Construction, Interior Design, Renovation, Architecture/Planning, and Construction Consultation." },
  { keywords: ["house", "residential", "home construction"], reply: "For house construction, we handle everything from planning through to handover. Share your requirements on the Contact page and our team will follow up." },
  { keywords: ["interior", "design"], reply: "Our interior design work covers living rooms, bedrooms, kitchens, and office/commercial interiors. You can browse sample work on the Projects & Interior page." },
  { keywords: ["renovation", "renovate"], reply: "We take on renovation projects, from structural changes to interior updates on existing homes." },
  { keywords: ["commercial"], reply: "We handle commercial construction and fit-outs, planned for functional layouts and coordinated delivery." },
  { keywords: ["architecture", "planning", "plan"], reply: "Our architecture/planning service covers design direction and planning support before construction begins." },
  { keywords: ["consult", "consultation", "advice"], reply: "Construction consultation is available if you'd like independent guidance on scope or decisions before starting a project." },
  { keywords: ["price", "pricing", "cost", "quote"], reply: "Pricing is currently shown as placeholder packages (Essential, Premium, Custom) on the Pricing Plans page. Actual costs are provided after a project discussion." },
  { keywords: ["contact", "call", "email", "phone", "reach"], reply: "You can reach us through the Contact Us page — fill in the enquiry form and our team will follow up." },
  { keywords: ["hi", "hello", "hey"], reply: "Hello! I can share basic information about our services, pricing, and projects. What would you like to know?" },
];

const FALLBACK_REPLY =
  "I don't have a specific answer for that yet. For detailed help, please use the Contact page and our team will get back to you directly.";

const WELCOME_MESSAGE = {
  role: "bot",
  text: "Hi, I'm the NextGenz assistant. I can share quick info on our services, pricing, and projects — this is an automated chat, not a live agent.",
};

function findReply(input) {
  const lower = input.toLowerCase();
  const match = RESPONSES.find((r) => r.keywords.some((k) => lower.includes(k)));
  return match ? match.reply : FALLBACK_REPLY;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!panelRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24, scale: prefersReducedMotion ? 1 : 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: prefersReducedMotion ? 0.01 : 0.35, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const pushBotReply = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text }]);
      setIsTyping(false);
    }, 600);
  };

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    pushBotReply(findReply(trimmed));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chatbot">
      {isOpen && (
        <div className="chatbot__panel" ref={panelRef} role="dialog" aria-label="NextGenz assistant chat">
          <div className="chatbot__header">
            <div>
              <p className="chatbot__header-title">NextGenz Assistant</p>
              <p className="chatbot__header-sub">Automated — not a live agent</p>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="chatbot__messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__bubble chatbot__bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="chatbot__bubble chatbot__bubble--bot chatbot__bubble--typing">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot__quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <button key={action} onClick={() => sendMessage(action)}>
                {action}
              </button>
            ))}
          </div>

          <form className="chatbot__input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Type a message"
            />
            <button type="submit" aria-label="Send message">
              <Send size={18} />
            </button>
          </form>

          <p className="chatbot__footer-note">
            Need a real answer? <Link to="/contact" onClick={() => setIsOpen(false)}>Contact us directly</Link>.
          </p>
        </div>
      )}

           {!isOpen && (
        <div className="chatbot__welcome" role="status">
          <span>What can I do for you?</span>
          <span className="chatbot__welcome-arrow" />
        </div>
      )}

      <button
        className="chatbot__toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}