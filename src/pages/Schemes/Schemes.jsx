import "./Schemes.css";

function Schemes() {

    const schemes = [
        {
            id: 1,
            name: "🌾 PM-KISAN",
            description:
                "Financial support scheme for eligible farmer families.",
            benefits:
                "Eligible farmers receive financial assistance directly into their bank account.",
            eligibility:
                "Small and marginal farmers meeting the scheme eligibility conditions.",
            documents:
                "Aadhaar Card, Bank Account Details, Land Records"
        },
        {
            id: 2,
            name: "🏥 Ayushman Bharat",
            description:
                "Health protection scheme providing cashless healthcare benefits.",
            benefits:
                "Eligible families can receive cashless treatment at empanelled hospitals.",
            eligibility:
                "Eligible families as per government scheme criteria.",
            documents:
                "Aadhaar Card, Ration Card, Government ID"
        }
    ];

    return (

        <div className="schemes-page">

            <div className="schemes-header">

                <h1>
                    🏛️ Government Schemes
                </h1>

                <p>
                    Explore government schemes available
                    for citizens.
                </p>

            </div>


            <div className="schemes-container">

                {schemes.map((scheme) => (

                    <div
                        className="scheme-card"
                        key={scheme.id}
                    >

                        <h2>
                            {scheme.name}
                        </h2>

                        <p className="scheme-description">
                            {scheme.description}
                        </p>


                        <div className="scheme-info">

                            <h3>
                                🎁 Benefits
                            </h3>

                            <p>
                                {scheme.benefits}
                            </p>


                            <h3>
                                👥 Eligibility
                            </h3>

                            <p>
                                {scheme.eligibility}
                            </p>


                            <h3>
                                📄 Required Documents
                            </h3>

                            <p>
                                {scheme.documents}
                            </p>

                        </div>


                        <button
                            className="scheme-btn"
                            onClick={() =>
                                alert(
                                    "Scheme information displayed successfully."
                                )
                            }
                        >
                            View Scheme
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Schemes;