import api from "./api";


// =========================================================
// OFFICER LOGIN
// =========================================================

export const officerLogin = async (data) => {
    return await api.post("/auth/officer-login", data);
};


// =========================================================
// CREATE DEPARTMENT HEAD
// =========================================================

// =========================================================
// CREATE DEPARTMENT HEAD
// =========================================================

export const createDepartmentHead = async (data) => {

    const requestData = {
        officerId: data.officerId,
        password: data.password,
        fullName: data.fullName,
        email: data.email || null,
        mobile: data.mobile,
        department: data.department
    };

    console.log(
        "Sending Department Head Request:",
        JSON.stringify(requestData, null, 2)
    );

    return api.post(
        "/officer-setup/department-head",
        requestData,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};

// =========================================================
// GET OFFICER COMPLAINTS
// =========================================================

export const getOfficerComplaints = async (officerId) => {

    if (!officerId) {
        throw new Error("Officer ID is required.");
    }

    return await api.get(
        `/complaints/officer/${encodeURIComponent(officerId)}`
    );
};


// =========================================================
// GET OFFICER COMPLAINTS BY STATUS
// =========================================================

export const getOfficerComplaintsByStatus = async (
    officerId,
    status
) => {

    if (!officerId) {
        throw new Error("Officer ID is required.");
    }

    return await api.get(
        `/complaints/officer/${encodeURIComponent(officerId)}/status`,
        {
            params: {
                status
            }
        }
    );
};


// =========================================================
// GET SINGLE OFFICER COMPLAINT
// =========================================================

export const getOfficerComplaint = async (
    officerId,
    complaintNumber
) => {

    return await api.get(
        `/complaints/officer/${encodeURIComponent(officerId)}/${encodeURIComponent(complaintNumber)}`
    );
};


// =========================================================
// UPDATE OFFICER COMPLAINT STATUS
// =========================================================

export const updateOfficerComplaintStatus = async (
    officerId,
    complaintNumber,
    status
) => {

    return await api.put(
        `/complaints/officer/${encodeURIComponent(officerId)}/${encodeURIComponent(complaintNumber)}/status`,
        null,
        {
            params: {
                status
            }
        }
    );
};


// =========================================================
// ADD OFFICER REMARKS
// =========================================================

export const addOfficerComplaintRemarks = async (
    officerId,
    complaintNumber,
    remarks
) => {

    return await api.put(
        `/complaints/officer/${encodeURIComponent(officerId)}/${encodeURIComponent(complaintNumber)}/remarks`,
        null,
        {
            params: {
                remarks
            }
        }
    );
};


// =========================================================
// GET DEPARTMENT COMPLAINTS
// =========================================================

export const getDepartmentComplaints = async (
    department
) => {

    if (!department) {
        throw new Error("Department is required.");
    }

    return await api.get(
        `/complaints/department/${encodeURIComponent(department)}`
    );
};


// =========================================================
// GET DEPARTMENT COMPLAINTS BY STATUS
// =========================================================

export const getDepartmentComplaintsByStatus = async (
    department,
    status
) => {

    if (!department) {
        throw new Error("Department is required.");
    }

    return await api.get(
        `/complaints/department/${encodeURIComponent(department)}/status`,
        {
            params: {
                status
            }
        }
    );
};


// =========================================================
// GET SINGLE DEPARTMENT COMPLAINT
// =========================================================

export const getDepartmentComplaint = async (
    department,
    complaintNumber
) => {

    return await api.get(
        `/complaints/department/${encodeURIComponent(department)}/${encodeURIComponent(complaintNumber)}`
    );
};


// =========================================================
// UPDATE DEPARTMENT COMPLAINT STATUS
// =========================================================

export const updateDepartmentComplaintStatus = async (
    department,
    complaintNumber,
    status
) => {

    return await api.put(
        `/complaints/department/${encodeURIComponent(department)}/${encodeURIComponent(complaintNumber)}/status`,
        null,
        {
            params: {
                status
            }
        }
    );
};


// =========================================================
// ADD DEPARTMENT COMPLAINT REMARKS
// =========================================================

export const addDepartmentComplaintRemarks = async (
    department,
    complaintNumber,
    remarks
) => {

    return await api.put(
        `/complaints/department/${encodeURIComponent(department)}/${encodeURIComponent(complaintNumber)}/remarks`,
        null,
        {
            params: {
                remarks
            }
        }
    );
};


// =========================================================
// DEPARTMENT DASHBOARD
// =========================================================

export const getDepartmentDashboard = async (
    department
) => {

    return await api.get(
        `/complaints/department/${encodeURIComponent(department)}/dashboard`
    );
};


// =========================================================
// OFFICER DASHBOARD
// =========================================================

export const getOfficerDashboard = async (
    officerId
) => {

    return await api.get(
        `/complaints/officer/${encodeURIComponent(officerId)}/dashboard`
    );
};


// =========================================================
// ALL BIRTH CERTIFICATE APPLICATIONS
// =========================================================

export const getAllBirthApplications = async () => {

    return await api.get(
        "/birth-certificate/all"
    );
};


// =========================================================
// ALL INCOME CERTIFICATE APPLICATIONS
// =========================================================

export const getAllIncomeApplications = async () => {

    return await api.get(
        "/income-certificate/all"
    );
};


// =========================================================
// APPROVE BIRTH APPLICATION
// =========================================================

export const approveApplication = async (id) => {

    return await api.put(
        `/birth-certificate/approve/${id}`
    );
};


// =========================================================
// REJECT BIRTH APPLICATION
// =========================================================

export const rejectApplication = async (id) => {

    return await api.put(
        `/birth-certificate/reject/${id}`
    );
};


// =========================================================
// APPROVE INCOME APPLICATION
// =========================================================

export const approveIncomeApplication = async (id) => {

    return await api.put(
        `/income-certificate/approve/${id}`
    );
};


// =========================================================
// REJECT INCOME APPLICATION
// =========================================================

export const rejectIncomeApplication = async (id) => {

    return await api.put(
        `/income-certificate/reject/${id}`
    );
};


// =========================================================
// LOGOUT
// =========================================================

export const officerLogout = () => {

    localStorage.removeItem("officer");

    localStorage.removeItem("officerToken");
};