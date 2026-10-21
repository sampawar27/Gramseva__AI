"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OfficerLogin() {

    const router = useRouter();

    const [officerId, setOfficerId] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/officer/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        officerId: officerId,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );

            // Save officer information
            localStorage.setItem(
                "officerId",
                data.officerId
            );

            localStorage.setItem(
                "officerName",
                data.fullName
            );

            // Go to dashboard
            router.push("/officer/dashboard");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f7fb"
            }}
        >

            <div
                style={{
                    width: "380px",
                    padding: "35px",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 5px 25px rgba(0,0,0,0.1)"
                }}
            >

                <h1 style={{ textAlign: "center" }}>
                    GramSeva
                </h1>

                <h2 style={{ textAlign: "center" }}>
                    Officer Login
                </h2>

                {error && (
                    <p
                        style={{
                            color: "red",
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin}>

                    <label>Officer ID</label>

                    <input
                        type="text"
                        value={officerId}
                        onChange={(e) =>
                            setOfficerId(e.target.value)
                        }
                        placeholder="Enter Officer ID"
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "8px",
                            marginBottom: "20px",
                            boxSizing: "border-box"
                        }}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "8px",
                            marginBottom: "25px",
                            boxSizing: "border-box"
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "#166534",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}