'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './ChatWidget.module.css';

interface Message {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
}

const staticAnswers: Record<string, string> = {
  pricing: "Our pricing is transparent and calculated based on standard rate tiers. The price you see at checkout includes basic labor and tools. Any additional materials needed will be invoiced post-inspection with your approval.",
  rework: "We offer a 100% Free Rework Guarantee! If you are not fully satisfied with the service quality, notify us within 24 hours and we will dispatch a senior expert to redo the service completely free.",
  cancel: "Yes, you can reschedule or cancel for free up to 3 hours before your scheduled slot. Cancellations within 3 hours will incur a nominal late fee of ₹150 to compensate our partner's travel.",
  safety: "Absolutely. All HomeService professionals undergo strict background verification, local police clearance checks, and hands-on skills tests. Only experts with a 4.8+ rating are dispatched."
};

const questionsList = [
  { id: 'pricing', label: '💰 How is pricing calculated?' },
  { id: 'rework', label: '🔄 What is the rework guarantee?' },
  { id: 'cancel', label: '📅 Can I cancel or reschedule?' },
  { id: 'safety', label: '🛡️ Are the professionals verified?' }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'advisor',
      text: "Hi there! I'm your HomeService Advisor. Ask me anything about our services, booking policies, or pricing!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleQuestionClick = (qId: string, qLabel: string) => {
    if (isTyping) return;

    setMessages(prev => {
      const userMsg: Message = { id: `user-${prev.length}`, sender: 'user', text: qLabel };
      return [...prev, userMsg];
    });
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        const replyMsg: Message = {
          id: `reply-${prev.length}`,
          sender: 'advisor',
          text: staticAnswers[qId] || "I'm sorry, I don't have an answer for that right now. Please email support@homeservice.in."
        };
        return [...prev, replyMsg];
      });
    }, 1000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'advisor',
        text: "Hi there! I'm your HomeService Advisor. Ask me anything about our services, booking policies, or pricing!"
      }
    ]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Inline trigger button inside help card */}
      <button 
        type="button" 
        className={styles.chatButton}
        onClick={() => setIsOpen(true)}
      >
        💬 Chat with Us
      </button>

      {/* Floating Chat Box Overlay */}
      {isOpen && (
        <div className={styles.chatWindow}>
          
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.advisorInfo}>
              <div className={styles.avatar}>🧑‍💼</div>
              <div>
                <h4>Service Advisor</h4>
                <div className={styles.statusRow}>
                  <span className={styles.onlineDot}></span>
                  <span>Online • Quick Reply</span>
                </div>
              </div>
            </div>
            <button 
              type="button" 
              className={styles.closeBtn} 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Logs Area */}
          <div className={styles.chatBody}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`${styles.msgBubble} ${msg.sender === 'user' ? styles.userMsg : styles.advisorMsg}`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.msgBubble} ${styles.advisorMsg} ${styles.typingBubble}`}>
                <div className={styles.dotFlashing}></div>
                <div className={styles.dotFlashing}></div>
                <div className={styles.dotFlashing}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions & Interactive inputs */}
          <div className={styles.chatFooter}>
            <div className={styles.suggestionsHeader}>Select a question:</div>
            <div className={styles.suggestionsList}>
              {questionsList.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  className={styles.suggestBtn}
                  onClick={() => handleQuestionClick(q.id, q.label)}
                  disabled={isTyping}
                >
                  {q.label}
                </button>
              ))}
            </div>

            {messages.length > 1 && (
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={resetChat}
                disabled={isTyping}
              >
                🔄 Reset Conversation
              </button>
            )}
          </div>

        </div>
      )}
    </>
  );
}
