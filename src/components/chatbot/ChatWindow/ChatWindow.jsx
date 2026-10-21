
import React, { useEffect, useRef } from "react";
import "./ChatWindow.css";

import MessageBubble from "../MessageBubble/MessageBubble";

function ChatWindow({ messages, isTyping }) {

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    return (
        <div className="chat-window">

            <div className="today">
                Today
            </div>

            <div className="messages">

                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                    />
                ))}


                {isTyping && (
                    <div className="typing-row">

                        <div className="typing-avatar">
                            🤖
                        </div>

                        <div className="typing-bubble">

                            <span></span>
                            <span></span>
                            <span></span>

                        </div>

                    </div>
                )}

                <div ref={bottomRef}></div>

            </div>

        </div>
    );
}

export default ChatWindow;
