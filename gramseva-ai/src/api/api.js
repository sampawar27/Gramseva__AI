import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api"
});


// =====================================================
// JWT TOKEN
// =====================================================

api.interceptors.request.use(
    (config) => {

const token =
    localStorage.getItem("officerToken") ||
    localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// ================= BIRTH CERTIFICATE =================

export const applyBirthCertificate = async (data) => {
    return await api.post("/birth-certificate/apply", data);
};


export const getMyApplications = async (villageId) => {
    return await api.get(
        `/birth-certificate/my-applications/${villageId}`
    );
};


export const getAllBirthApplications = async () => {
    return await api.get("/birth-certificate/all");
};


export const getBirthCertificateById = async (id) => {
    return await api.get(
        `/birth-certificate/${id}`
    );
};


export const approveApplication = async (id) => {
    return await api.put(
        `/birth-certificate/approve/${id}`
    );
};


export const rejectApplication = async (id) => {
    return await api.put(
        `/birth-certificate/reject/${id}`
    );
};


export const downloadBirthCertificate = async (id) => {

    return await api.get(
        `/birth-certificate/download/${id}`,
        {
            responseType: "blob"
        }
    );

};


// ================= PROFILE =================

export const getProfile = async (villageId) => {

    return await api.get(
        `/user/profile/${villageId}`
    );

};


export const updateProfile = async (villageId, data) => {

    return await api.put(
        `/user/profile/${villageId}`,
        data
    );

};


// ================= CHANGE PASSWORD =================

export const changePassword = async (villageId, data) => {

    return await api.put(
        `/user/change-password/${villageId}`,
        data
    );

};


export default api;

// =========================================================
// INCOME CERTIFICATE APIs
// =========================================================

export const applyIncomeCertificate = async (data) => {
    return await api.post(
        "/income-certificate/apply",
        data
    );
};

export const getMyIncomeApplications = async (villageId) => {
    return await api.get(
        `/income-certificate/my-applications/${villageId}`
    );
};

export const getAllIncomeApplications = async () => {
    return await api.get(
        "/income-certificate/all"
    );
};

export const getIncomeApplicationById = async (id) => {
    return await api.get(
        `/income-certificate/${id}`
    );
};

export const approveIncomeApplication = async (id) => {
    return await api.put(
        `/income-certificate/approve/${id}`
    );
};

export const rejectIncomeApplication = async (id) => {
    return await api.put(
        `/income-certificate/reject/${id}`
    );
};