import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
    FaLeaf,
    FaArrowRight
} from "react-icons/fa";


const Navbar = () => {

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();


    // =====================================================
    // CHANGE LANGUAGE
    // =====================================================

    const handleLanguageChange = (e) => {

        const selectedLanguage = e.target.value;

        i18n.changeLanguage(selectedLanguage);

        localStorage.setItem(
            "language",
            selectedLanguage
        );

    };


    return (

        <nav className="navbar">


            {/* =================================================
                LOGO
            ================================================= */}

            <div
                className="navbar-logo"
                onClick={() => navigate("/")}
            >

                <div className="logo-circle">

                    <FaLeaf className="logo-icon" />

                </div>


                <div className="logo-text">

                    <span className="logo-title">
                        GramSeva
                    </span>

                    <span className="logo-ai">
                        AI
                    </span>

                    <small>
                        Digital Governance
                    </small>

                </div>

            </div>


            {/* =================================================
                NAVIGATION LINKS
            ================================================= */}

            <ul className="navbar-links">


                <li>
                    <a href="/">
                        {t("home")}
                    </a>
                </li>


                <li>
                    <a href="#services">
                        {t("services")}
                    </a>
                </li>


                <li>
                    <a href="#schemes">
                        {t("schemes")}
                    </a>
                </li>


                <li>
                    <a href="#ai-assistant">
                        {t("aiAssistant")}
                    </a>
                </li>


                <li>
                    <a href="#about">
                        About
                    </a>
                </li>


                <li>
                    <a href="#contact">
                        {t("contact")}
                    </a>
                </li>


            </ul>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="navbar-right">


                {/* =================================================
                    LANGUAGE
                ================================================= */}

                <select
                    className="language-select"
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    aria-label={t("language")}
                >

                    <option value="en">
                        {t("english")}
                    </option>

                    <option value="mr">
                        {t("marathi")}
                    </option>

                </select>


                {/* =================================================
                    LOGIN
                ================================================= */}

                <button
                    className="navbar-login-btn"
                    onClick={() =>
                        navigate("/login")
                    }
                >

                    <span className="login-icon">
                        ⇥
                    </span>

                    <span>
                        {t("login")}
                    </span>

                </button>


                {/* =================================================
                    REGISTER
                ================================================= */}

                <button
                    className="navbar-register-btn"
                    onClick={() =>
                        navigate("/register")
                    }
                >

                    <span>
                        {t("register")}
                    </span>

                    <FaArrowRight
                        className="register-arrow"
                    />

                </button>


            </div>


        </nav>

    );

};


export default Navbar;