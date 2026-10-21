import axios from "axios";

const API_URL =
    "http://localhost:8080/api/complaints";


// =========================================================
// CREATE COMPLAINT
// =========================================================

export const createComplaint = (complaintData) => {

    return axios.post(
        API_URL,
        complaintData
    );
};


// =========================================================
// GET MY COMPLAINTS
// =========================================================

export const getMyComplaints = (villageId) => {

    return axios.get(
        `${API_URL}/citizen/${villageId}`
    );
};


// =========================================================
// GET COMPLAINT BY ID
// =========================================================

export const getComplaintById = (id) => {

    return axios.get(
        `${API_URL}/${id}`
    );
};


// =========================================================
// GET ALL COMPLAINTS — OFFICER
// =========================================================

export const getAllComplaints = () => {

    return axios.get(
        API_URL
    );
};


// =========================================================
// GET BY STATUS
// =========================================================

export const getComplaintsByStatus = (
    status
) => {

    return axios.get(
        `${API_URL}/status/${status}`
    );
};


// =========================================================
// GET BY DEPARTMENT
// =========================================================

export const getComplaintsByDepartment = (
    department
) => {

    return axios.get(
        `${API_URL}/department/${department}`
    );
};


// =========================================================
// UPDATE COMPLAINT STATUS
// =========================================================

export const updateComplaintStatus = (
    id,
    status,
    officerRemarks,
    assignedOfficer
) => {

    return axios.put(
        `${API_URL}/${id}/status`,
        null,
        {
            params: {
                status,
                officerRemarks,
                assignedOfficer
            }
        }
    );
};