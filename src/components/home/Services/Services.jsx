import "./Services.css";

import {
    FaFileAlt,
    FaClipboardList,
    FaLandmark,
    FaMoneyBillWave,
    FaRobot,
    FaBullhorn
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function Services() {

    const navigate = useNavigate();

    const { t } = useTranslation();


    // =====================================================
    // SERVICES
    // =====================================================

    const services = [

        {
            icon: <FaFileAlt />,
            title: t("certificates"),
            description: t(
                "certificatesDescription"
            )
        },

        {
            icon: <FaClipboardList />,
            title: t("complaints"),
            description: t(
                "complaintsDescription"
            )
        },

        {
            icon: <FaLandmark />,
            title: t("governmentSchemes"),
            description: t(
                "governmentSchemesDescription"
            )
        },

        {
            icon: <FaMoneyBillWave />,
            title: t("taxPayments"),
            description: t(
                "taxPaymentsDescription"
            )
        },

        {
            icon: <FaRobot />,
            title: t("aiAssistant"),
            description: t(
                "aiAssistantDescription"
            )
        },

        {
            icon: <FaBullhorn />,
            title: t("notices"),
            description: t(
                "noticesDescription"
            )
        }

    ];


    // =====================================================
    // LEARN MORE
    // =====================================================

    const handleLearnMore = (title) => {

        if (
            title === t("complaints")
        ) {

            navigate("/citizen/complaints");

        }

    };


    return (

        <section
            className="services"
            id="services"
        >


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="services-header">

                <h2>
                    {t("ourDigitalServices")}
                </h2>


                <p>
                    {t("servicesDescription")}
                </p>

            </div>


            {/* =================================================
                SERVICES GRID
            ================================================= */}

            <div className="services-grid">


                {services.map(
                    (service, index) => (

                        <div
                            className="service-card"
                            key={index}
                        >


                            <div className="service-icon">
                                {service.icon}
                            </div>


                            <h3>
                                {service.title}
                            </h3>


                            <p>
                                {service.description}
                            </p>


                            <button
                                className="service-btn"
                                onClick={() =>
                                    handleLearnMore(
                                        service.title
                                    )
                                }
                            >

                                {t("learnMore")} →

                            </button>


                        </div>

                    )
                )}


            </div>


        </section>

    );

}


export default Services;