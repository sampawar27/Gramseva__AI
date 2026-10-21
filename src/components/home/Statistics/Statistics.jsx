import "./Statistics.css";

import {
    FaUsers,
    FaFileAlt,
    FaClipboardCheck,
    FaBuilding
} from "react-icons/fa";

import { useTranslation } from "react-i18next";


function Statistics() {

    const { t } = useTranslation();


    const statistics = [

        {
            icon: <FaUsers />,
            number: "15,000+",
            title: t("citizensServed")
        },

        {
            icon: <FaFileAlt />,
            number: "8,200+",
            title: t("certificatesIssued")
        },

        {
            icon: <FaClipboardCheck />,
            number: "4,500+",
            title: t("complaintsResolved")
        },

        {
            icon: <FaBuilding />,
            number: "120+",
            title: t("gramPanchayatsConnected")
        }

    ];


    return (

        <section className="statistics">


            {/* =================================================
                HEADING
            ================================================= */}

            <div className="statistics-heading">

                <h2>
                    {t("platformStatistics")}
                </h2>

                <p>
                    {t("statisticsDescription")}
                </p>

            </div>


            {/* =================================================
                STATISTICS CARDS
            ================================================= */}

            <div className="statistics-grid">


                {statistics.map(
                    (item, index) => (

                        <div
                            className="statistics-card"
                            key={index}
                        >

                            <div className="statistics-icon">
                                {item.icon}
                            </div>


                            <h3>
                                {item.number}
                            </h3>


                            <p>
                                {item.title}
                            </p>

                        </div>

                    )
                )}


            </div>


        </section>

    );

}


export default Statistics;