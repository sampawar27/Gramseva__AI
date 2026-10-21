
import React from "react";
import "./MessageBubble.css";

function MessageBubble({ message }) {

    const isSender = message.sender === "sender";

    return (
        <div
            className={
                isSender
                    ? "message-row sender-row"
                    : "message-row receiver-row"
            }
        >

            {/* Receiver avatar */}
            {!isSender && (
                <div className="message-avatar">
                    🤖
                </div>
            )}


            <div
                className={
                    isSender
                        ? "message-bubble sender-bubble"
                        : "message-bubble receiver-bubble"
                }
            >

                <div className="message-text">
                    {message.text}
                </div>

                <div className="message-info">

                    <span>
                        {message.time}
                    </span>

                    {isSender && (
                        <span className="double-check">
                            ✓✓
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
}

export default MessageBubble;
