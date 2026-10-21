
import React, { useState } from "react";
import "./Chatbot.css";

import ChatWindow from "./ChatWindow/ChatWindow";
import ChatInput from "./ChatInput/ChatInput";

function Chatbot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "receiver",
            text: "Namaste! 👋 Welcome to GramSeva AI.",
            time: "10:30 AM",
        },
        {
            id: 2,
            sender: "receiver",
            text: "How can I help you today?",
            time: "10:30 AM",
        },
    ]);

    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: "sender",
            text: text.trim(),
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((prev) => [...prev, userMessage]);

        setIsTyping(true);

        // Temporary response
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                sender: "receiver",
                text: getBotResponse(text),
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const getBotResponse = (message) => {
        const text = message.toLowerCase();

        if (text.includes("hello") || text.includes("hi")) {
            return "Hello! 👋 How can I help you with GramSeva services?";
        }

        if (text.includes("birth")) {
            return "I can help you with a Birth Certificate. You can apply through the Apply Certificate section.";
        }

        if (text.includes("income")) {
            return "You can apply for an Income Certificate from the Apply Certificate section.";
        }

        if (
            text.includes("residence") ||
            text.includes("address")
        ) {
            return "You can apply for a Residence Certificate from the Apply Certificate section.";
        }

        if (text.includes("complaint")) {
            return "You can submit and track your complaint from the Complaints section.";
        }

        if (text.includes("scheme")) {
            return "I can help you find information about government schemes. Please tell me which scheme you are interested in.";
        }

        return "I'm here to help you with GramSeva services. Please tell me what you need assistance with.";
    };

    return (
        <div className="chatbot-page">

            <div className="chatbot">

                {/* HEADER */}
                <div className="chatbot-header">

                    <div className="header-profile">

                        <div className="header-avatar">
                            🤖
                        </div>

                        <div>
                            <h2>GramSeva AI</h2>

                            <div className="online">
                                <span></span>
                                Online
                            </div>
                        </div>

                    </div>

                    <button
                        className="menu-button"
                        type="button"
                    >
                        ⋮
                    </button>

                </div>


                {/* CHAT */}
                <ChatWindow
                    messages={messages}
                    isTyping={isTyping}
                />


                {/* INPUT */}
                <ChatInput
                    onSend={sendMessage}
                />

            </div>

        </div>
    );
}

export default Chatbot;
