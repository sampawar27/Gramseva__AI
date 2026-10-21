
import React, { useState } from "react";
import "./ChatInput.css";

function ChatInput({ onSend }) {

    const [text, setText] = useState("");


    const handleSubmit = (e) => {

        e.preventDefault();

        if (!text.trim()) return;

        onSend(text);

        setText("");
    };


    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSubmit(e);
        }
    };


    return (
        <form
            className="chat-input"
            onSubmit={handleSubmit}
        >

            <button
                type="button"
                className="attach-button"
            >
                📎
            </button>


            <textarea
                value={text}
                onChange={(e) =>
                    setText(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows="1"
            />


            <button
                type="submit"
                className="send-button"
                disabled={!text.trim()}
            >
                ➤
            </button>

        </form>
    );
}

export default ChatInput;
