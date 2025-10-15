import React, { useEffect, useState, useRef } from "react";
// Assuming lucide-react is available for consistent icon styling if needed, 
// though the original uses simple text characters (✕, ➤).

// --- Configuration ---
// CORRECTED: Must be the full path to the POST endpoint.
const API_ENDPOINT = 'https://portfolio-chatbot-1-1.onrender.com/ask'; 

// --- Component ---
// The component now relies entirely on the 'isOpen' prop from the parent (App.jsx)
function RAGChatbotWidget({ isOpen, onClose }) {
    // We keep state internal only for messages, input, loading, and session ID
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hello! I'm Kushraj's AI Assistant. Ask me questions about my portfolio, skills, or projects!" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null); 

    const messagesEndRef = useRef(null);

    // 1. Initialize Session ID (Runs once on mount)
    useEffect(() => {
        let id = localStorage.getItem('chatSessionId');
        if (!id) {
            id = `kushraj-${Date.now().toString()}`; 
            localStorage.setItem('chatSessionId', id);
        }
        setSessionId(id);
    }, []);

    // 2. Auto-scroll effect
    useEffect(() => {
        if (isOpen) {
             messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    // 3. Send Message and handle API call
    const sendMessage = async () => {
        if (!input.trim() || isLoading || !sessionId) return;
        
        const userMsgText = input.trim();
        const userMsg = { sender: "user", text: userMsgText };
        
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Fetch targets the full API_ENDPOINT URL: https://portfolio-chatbot-1-1.onrender.com/ask
            const response = await fetch(API_ENDPOINT, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    question: userMsgText, 
                    session_id: sessionId // Key matches FastAPI's Pydantic model
                }),
            });

            if (!response.ok) {
                throw new Error(`API failed with status: ${response.status}`);
            }

            const data = await response.json();
            
            const aiReplyText = data.answer || "Sorry, I couldn't process the response from the server.";

            setMessages((prev) => [...prev, { sender: "ai", text: aiReplyText }]);

        } catch (error) {
            console.error("RAG Chatbot API Error:", error);
            // This error message is for troubleshooting the connection/CORS
            const errorReply = "I'm having connection trouble. Please ensure the FastAPI server is running and CORS is configured.";
            setMessages((prev) => [...prev, { sender: "ai", text: errorReply }]);
            
        } finally {
            setIsLoading(false);
        }
    };

    // --- Conditional Rendering ---
    if (!isOpen) return null;

    return (
        // 🚨 FIX: Applied Tailwind classes for fixed position and styling
        <div 
            className="rhea-chatbox fixed bottom-4 right-4 z-[9999] w-full max-w-xs h-[400px] shadow-2xl bg-[#0a0a1a] flex flex-col rounded-xl overflow-hidden border border-purple-500/30 transition-all duration-300"
            style={{
                
                // Ensure it looks good on small mobile screens
                maxWidth: window.innerWidth < 640 ? '90%' : '320px' 
            }}
        > 
            <div className="rhea-header bg-purple-700/20 p-3 flex justify-between items-center border-b border-purple-500/30">
                <span className="text-white font-semibold text-base">Kushraj's AI Assistant 🤖</span>
                <button onClick={onClose} className="text-gray-300 hover:text-white text-xl">✕</button>
            </div>
            
            {/* Messages Area */}
            <div className="rhea-messages flex-1 p-3 overflow-y-auto space-y-3 text-sm">
                {messages.map((m, i) => (
                    // Using basic inline styling to ensure messages are visible
                    <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-2 rounded-lg ${
                            m.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-sm' 
                            : 'bg-gray-700 text-gray-200 rounded-tl-sm'
                        }`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-[85%] p-2 rounded-lg bg-gray-700 text-gray-400">
                            <span className="animate-pulse">Thinking...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="rhea-input p-3 border-t border-purple-500/30">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "Please wait..." : "Type your question..."}
                        disabled={isLoading}
                        className="flex-grow p-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button 
                        onClick={sendMessage} 
                        disabled={isLoading || !input.trim()}
                        className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition disabled:bg-gray-700"
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RAGChatbotWidget;