const BASE_URL = import.meta.env.VITE_API_URL || "https://gramseva-ai-backend-sax7.onrender.com";
const API_URL = `${BASE_URL}/api`;

export async function loginOfficer(officerId, password) {
    const response = await fetch(`${API_URL}/auth/officer/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            officerId: officerId,
            password: password
        })
    });

    return await response.json();
}

export async function getOfficerDashboard(token) {
    const response = await fetch(`${API_URL}/officer/dashboard`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function getOfficerComplaints(token) {
    const response = await fetch(`${API_URL}/officer/complaints`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}