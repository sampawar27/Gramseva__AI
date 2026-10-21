import "./Hero.css";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import villageImage from "../../../assets/images/rural-village.jpeg";


function Hero() {

    const navigate = useNavigate();

    const { t } = useTranslation();


    // =====================================================
    // OPEN GRAMSEVA AI CHATBOT
    // =====================================================

    const openChatbot = () => {

        window.dispatchEvent(
            new Event("open-gramseva-chatbot")
        );

    };


    return (

        <section className="hero-section">

            <div className="hero-container">


                {/* =================================================
                    LEFT CONTENT
                ================================================= */}

                <div className="hero-content">

                    <h1>

                        {t("heroTitle1")}

                        <br />

                        {t("heroTitle2")}

                        <br />

                        {t("heroTitle3")}

                    </h1>


                    <p>

                        {t("heroDescription")}

                    </p>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="hero-buttons">


                        {/* GET STARTED */}

                        <button
                            className="hero-primary-btn"
                            onClick={() =>
                                navigate("/register")
                            }
                        >

                            {t("getStarted")}

                            <span>
                                →
                            </span>

                        </button>


                        {/* TALK TO AI */}

                        <button
                            type="button"
                            className="hero-ai-btn"
                            onClick={openChatbot}
                        >

                            <span className="hero-ai-icon">
                                🤖
                            </span>

                            <span>
                                {t("talkToAI")}
                            </span>

                        </button>


                    </div>

                </div>


                {/* =================================================
                    RIGHT SIDE — RURAL VILLAGE IMAGE
                ================================================= */}

                <div className="hero-image-container">


                    <img
                        src={villageImage}
                        alt={t("ruralVillageAlt")}
                        className="hero-village-image"
                    />


                    {/* =================================================
                        IMAGE INFORMATION CARD
                    ================================================= */}

                    <div className="hero-image-card">


                        <div className="hero-image-card-icon">
                            🌿
                        </div>


                        <div>

                            <h3>
                                GramSeva AI
                            </h3>

                            <p>
                                {t(
                                    "digitalGovernanceEveryVillage"
                                )}
                            </p>

                        </div>


                    </div>


                </div>


            </div>

        </section>

    );

}


export default Hero;