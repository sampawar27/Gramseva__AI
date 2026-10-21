
import { useState } from "react";
import "./Home.css";

import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Statistics from "../../components/home/Statistics";
import Services from "../../components/home/Services";
import Schemes from "../../components/home/Schemes";
import Departments from "../../components/home/Departments";
import AISection from "../../components/home/AISection";
import Testimonials from "../../components/home/Testimonials";
import FAQ from "../../components/home/FAQ";
import Contact from "../../components/home/Contact";
import Footer from "../../components/layout/Footer";

import Chatbot from "../../components/chatbot/Chatbot";

function Home() {
    const [showChatbot, setShowChatbot] = useState(false);

    return (
        <>
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Statistics Section */}
            <Statistics />

            {/* Services Section */}
            <Services />

            {/* Government Schemes Section */}
            <Schemes />

            {/* Departments Section */}
            <Departments />

            {/* AI Assistant Section */}
            <AISection onTalkToAI={() => setShowChatbot(true)} />

            {/* Testimonials Section */}
            <Testimonials />

            {/* FAQ Section */}
            <FAQ />

            {/* Contact Section */}
            <Contact />

            {/* Footer */}
            <Footer />

            {/* Chatbot Overlay */}
            {showChatbot && (
                <div className="chatbot-overlay">
                    <div className="chatbot-overlay-content">
                        <button
                            className="chatbot-close"
                            type="button"
                            onClick={() => setShowChatbot(false)}
                        >
                            ×
                        </button>

                        <Chatbot />
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;

