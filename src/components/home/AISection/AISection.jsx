
import "./AISection.css";

import { FaRobot, FaComments } from "react-icons/fa";

function AISection({ onTalkToAI }) {
    return (
        <section className="ai-section">
            <div className="ai-left">
                <span className="ai-tag">
                    🤖 AI Powered
                </span>

                <h2>GramSeva AI Assistant</h2>

                <p>
                    Ask questions related to certificates,
                    government schemes, taxes,
                    complaints and village services.
                    Get instant AI-powered guidance.
                </p>

                <div className="quick-actions">
                    <button type="button">
                        📄 Certificates
                    </button>

                    <button type="button">
                        📝 Complaints
                    </button>

                    <button type="button">
                        🏛️ Schemes
                    </button>

                    <button type="button">
                        💳 Taxes
                    </button>
                </div>

                <button
                    className="chat-btn"
                    type="button"
                    onClick={onTalkToAI}
                >
                    <FaComments />
                    Chat with AI
                </button>
            </div>

            <div className="ai-right">
                <div className="chat-window">
                    <div className="chat-header">
                        <FaRobot />
                        GramSeva AI
                    </div>

                    <div className="chat-message citizen">
                        <strong>Citizen</strong>

                        <p>
                            How can I apply for an Income Certificate?
                        </p>
                    </div>

                    <div className="chat-message ai">
                        <strong>GramSeva AI</strong>

                        <p>
                            Go to Certificate Services →
                            Select Income Certificate →
                            Upload Aadhaar →
                            Submit your application.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AISection;
