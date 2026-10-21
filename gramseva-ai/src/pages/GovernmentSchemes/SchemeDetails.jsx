import "./SchemeDetails.css";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import governmentSchemes from "../../data/governmentSchemes";


function SchemeDetails() {

    const navigate = useNavigate();

    const { id } = useParams();


    /* ==========================================
       FIND SCHEME
    ========================================== */

    const scheme = governmentSchemes.find(
        (item) =>
            String(item.id) === String(id)
    );


    /* ==========================================
       SCHEME NOT FOUND
    ========================================== */

    if (!scheme) {

        return (

            <div className="scheme-details-page">

                <div className="scheme-not-found">

                    <div className="not-found-icon">
                        🔍
                    </div>

                    <h2>
                        Scheme Not Found
                    </h2>

                    <p>
                        The government scheme you are
                        looking for does not exist.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/citizen/schemes")
                        }
                    >
                        ← Back to Government Schemes
                    </button>

                </div>

            </div>

        );

    }


    /* ==========================================
       BACK TO SCHEMES
    ========================================== */

    const handleBack = () => {

        navigate("/citizen/schemes");

    };


    /* ==========================================
       OFFICIAL WEBSITE
    ========================================== */

    const handleOfficialWebsite = () => {

        if (scheme.officialWebsite) {

            window.open(
                scheme.officialWebsite,
                "_blank",
                "noopener,noreferrer"
            );

        }

    };


    /* ==========================================
       PAGE
    ========================================== */

    return (

        <div className="scheme-details-page">


            {/* ======================================
                BACK BUTTON
            ====================================== */}

            <button
                className="scheme-back-btn"
                onClick={handleBack}
            >
                ← Back to Government Schemes
            </button>


            {/* ======================================
                MAIN CARD
            ====================================== */}

            <div className="scheme-details-card">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="scheme-details-header">

                    <div className="scheme-details-icon">

                        {scheme.icon || "🏛️"}

                    </div>


                    <div className="scheme-details-title">

                        <span className="scheme-category">

                            {scheme.category ||
                                "Government Scheme"}

                        </span>


                        <h1>
                            {scheme.name}
                        </h1>


                        {scheme.shortDescription && (

                            <p>
                                {scheme.shortDescription}
                            </p>

                        )}

                    </div>

                </div>


                {/* ==================================
                    DESCRIPTION
                ================================== */}

                {scheme.description && (

                    <section className="scheme-detail-section">

                        <h2>
                            📖 About the Scheme
                        </h2>

                        <p>
                            {scheme.description}
                        </p>

                    </section>

                )}


                {/* ==================================
                    BENEFITS
                ================================== */}

                {scheme.benefits && (

                    <section className="scheme-detail-section">

                        <h2>
                            🎁 Benefits
                        </h2>


                        {Array.isArray(
                            scheme.benefits
                        ) ? (

                            <ul className="scheme-list">

                                {scheme.benefits.map(
                                    (benefit, index) => (

                                        <li key={index}>
                                            {benefit}
                                        </li>

                                    )
                                )}

                            </ul>

                        ) : (

                            <p>
                                {scheme.benefits}
                            </p>

                        )}

                    </section>

                )}


                {/* ==================================
                    ELIGIBILITY
                ================================== */}

                {scheme.eligibility && (

                    <section className="scheme-detail-section">

                        <h2>
                            ✅ Eligibility
                        </h2>


                        {Array.isArray(
                            scheme.eligibility
                        ) ? (

                            <ul className="scheme-list">

                                {scheme.eligibility.map(
                                    (item, index) => (

                                        <li key={index}>
                                            {item}
                                        </li>

                                    )
                                )}

                            </ul>

                        ) : (

                            <p>
                                {scheme.eligibility}
                            </p>

                        )}

                    </section>

                )}


                {/* ==================================
                    DOCUMENTS
                ================================== */}

                {scheme.documents && (

                    <section className="scheme-detail-section">

                        <h2>
                            📄 Required Documents
                        </h2>


                        {Array.isArray(
                            scheme.documents
                        ) ? (

                            <ul className="scheme-list">

                                {scheme.documents.map(
                                    (document, index) => (

                                        <li key={index}>
                                            {document}
                                        </li>

                                    )
                                )}

                            </ul>

                        ) : (

                            <p>
                                {scheme.documents}
                            </p>

                        )}

                    </section>

                )}


                {/* ==================================
                    HOW TO APPLY
                ================================== */}

                {scheme.howToApply && (

                    <section className="scheme-detail-section">

                        <h2>
                            📝 How to Apply
                        </h2>


                        {Array.isArray(
                            scheme.howToApply
                        ) ? (

                            <ol className="scheme-list">

                                {scheme.howToApply.map(
                                    (step, index) => (

                                        <li key={index}>
                                            {step}
                                        </li>

                                    )
                                )}

                            </ol>

                        ) : (

                            <p>
                                {scheme.howToApply}
                            </p>

                        )}

                    </section>

                )}


                {/* ==================================
                    ACTION BUTTONS
                ================================== */}

                <div className="scheme-detail-actions">


                    <button
                        className="scheme-back-action"
                        onClick={handleBack}
                    >
                        ← View All Schemes
                    </button>


                    {scheme.officialWebsite && (

                        <button
                            className="scheme-official-btn"
                            onClick={
                                handleOfficialWebsite
                            }
                        >
                            🌐 Official Website →
                        </button>

                    )}

                </div>


            </div>

        </div>

    );

}


export default SchemeDetails;