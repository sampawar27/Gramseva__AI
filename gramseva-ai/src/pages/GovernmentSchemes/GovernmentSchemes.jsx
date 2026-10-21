import "./GovernmentSchemes.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import governmentSchemes from "../../data/governmentSchemes";


function GovernmentSchemes() {

    const navigate = useNavigate();


    /* ============================
       SEARCH
    ============================ */

    const [search, setSearch] = useState("");


    /* ============================
       CATEGORY
    ============================ */

    const [category, setCategory] = useState("All");


    /* ============================
       GET CATEGORIES
    ============================ */

    const categories = [
        "All",
        ...new Set(
            governmentSchemes.map(
                (scheme) => scheme.category
            )
        )
    ];


    /* ============================
       FILTER SCHEMES
    ============================ */

    const filteredSchemes =
        governmentSchemes.filter((scheme) => {

            const searchText =
                search.toLowerCase().trim();


            const matchesSearch =
                scheme.name
                    .toLowerCase()
                    .includes(searchText) ||

                scheme.description
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                category === "All" ||
                scheme.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    /* ============================
       CLEAR FILTERS
    ============================ */

    const clearFilters = () => {

        setSearch("");
        setCategory("All");

    };


    /* ============================
       OPEN SCHEME DETAILS
    ============================ */

    const handleViewDetails = (id) => {

        navigate(
            `/citizen/schemes/${id}`
        );

    };


    /* ============================
       RETURN
    ============================ */

    return (

        <div className="government-schemes">


            {/* ============================
                HEADER
            ============================ */}

            <div className="schemes-header">

                <div>

                    <h1>
                        🏛️ Government Schemes
                    </h1>

                    <p>
                        Explore government schemes and
                        welfare programs available for citizens.
                    </p>

                </div>


                <button
                    className="back-dashboard-btn"
                    onClick={() =>
                        navigate(
                            "/citizen/dashboard"
                        )
                    }
                >
                    ← Dashboard
                </button>

            </div>


            {/* ============================
                SEARCH + FILTER
            ============================ */}

            <div className="schemes-filter-section">


                {/* SEARCH */}

                <div className="scheme-search">

                    <span className="search-icon">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search government schemes..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>


                {/* CATEGORY */}

                <div className="scheme-category-filter">

                    <label>
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value
                            )
                        }
                    >

                        {categories.map(
                            (item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            )
                        )}

                    </select>

                </div>


            </div>


            {/* ============================
                RESULT INFORMATION
            ============================ */}

            <div className="scheme-result-header">

                <div>

                    <h2>
                        Available Schemes
                    </h2>

                    <p>
                        Showing{" "}
                        <strong>
                            {filteredSchemes.length}
                        </strong>{" "}
                        scheme
                        {filteredSchemes.length !== 1
                            ? "s"
                            : ""}
                    </p>

                </div>


                {(search ||
                    category !== "All") && (

                    <button
                        className="clear-filter-btn"
                        onClick={clearFilters}
                    >
                        ✕ Clear Filters
                    </button>

                )}

            </div>


            {/* ============================
                SCHEME CARDS
            ============================ */}

            {filteredSchemes.length > 0 ? (

                <div className="schemes-grid">

                    {filteredSchemes.map(
                        (scheme) => (

                            <div
                                className="scheme-card"
                                key={scheme.id}
                            >


                                {/* ICON */}

                                <div className="scheme-card-top">

                                    <div className="scheme-icon">

                                        {scheme.icon ||
                                            "🏛️"}

                                    </div>


                                    <span className="scheme-category">

                                        {scheme.category}

                                    </span>

                                </div>


                                {/* NAME */}

                                <h3>
                                    {scheme.name}
                                </h3>


                                {/* DESCRIPTION */}

                                <p className="scheme-description">

                                    {scheme.description}

                                </p>


                                {/* BENEFIT */}

                                {scheme.benefits && (

                                    <div className="scheme-benefit">

                                        <strong>
                                            🎁 Benefits
                                        </strong>

                                        <p>

                                            {Array.isArray(
                                                scheme.benefits
                                            )
                                                ? scheme
                                                    .benefits
                                                    .slice(0, 1)
                                                    .join("")
                                                : scheme.benefits}

                                        </p>

                                    </div>

                                )}


                                {/* BUTTON */}

                                <button
                                    className="scheme-details-btn"
                                    onClick={() =>
                                        handleViewDetails(
                                            scheme.id
                                        )
                                    }
                                >

                                    View Details →

                                </button>

                            </div>

                        )
                    )}

                </div>

            ) : (

                /* ============================
                   NO RESULTS
                ============================ */

                <div className="no-schemes">

                    <div className="no-schemes-icon">
                        🔍
                    </div>

                    <h3>
                        No Schemes Found
                    </h3>

                    <p>
                        We couldn't find any government
                        scheme matching your search.
                    </p>

                    <button
                        onClick={clearFilters}
                    >
                        Show All Schemes
                    </button>

                </div>

            )}


            {/* ============================
                INFORMATION SECTION
            ============================ */}

            <div className="schemes-information">

                <div className="information-icon">
                    ℹ️
                </div>

                <div>

                    <h3>
                        Important Information
                    </h3>

                    <p>
                        Scheme eligibility, benefits and
                        required documents may vary.
                        Please verify the latest information
                        on the official government website
                        before applying.
                    </p>

                </div>

            </div>


        </div>

    );

}


export default GovernmentSchemes;