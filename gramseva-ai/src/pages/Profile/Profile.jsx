import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../api/api";

function Profile() {

    const [user, setUser] = useState({});

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const loggedUser =
                JSON.parse(localStorage.getItem("user"));

            const response =
                await getProfile(loggedUser.villageId);

            setUser(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSave = async () => {

        try {

            await updateProfile(user.villageId, user);

            alert("Profile Updated Successfully");

            setIsEditing(false);

            loadProfile();

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="profile-container">

            <div className="profile-card">

                <h1>👤 My Profile</h1>

                <div className="profile-grid">

                    <div>

                        <label>Village ID</label>

                        <input
                            value={user.villageId || ""}
                            readOnly
                        />

                    </div>

                    <div>

                        <label>Full Name</label>

                        <input
                            value={user.fullName || ""}
                            readOnly
                        />

                    </div>

                    <div>

                        <label>Email</label>

                        <input
                            name="email"
                            value={user.email || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    <div>

                        <label>Mobile</label>

                        <input
                            name="mobile"
                            value={user.mobile || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    <div>

                        <label>Village</label>

                        <input
                            name="village"
                            value={user.village || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    <div>

                        <label>Taluka</label>

                        <input
                            name="taluka"
                            value={user.taluka || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    <div>

                        <label>District</label>

                        <input
                            name="district"
                            value={user.district || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    <div>

                        <label>State</label>

                        <input
                            name="state"
                            value={user.state || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    <div>

                        <label>Pincode</label>

                        <input
                            name="pincode"
                            value={user.pincode || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    <div>

                        <label>Role</label>

                        <input
                            value={user.role || ""}
                            readOnly
                        />

                    </div>

                    <div>

                        <label>Status</label>

                        <input
                            value={user.status || ""}
                            readOnly
                        />

                    </div>

                </div>

                {

                    !isEditing ?

                        <div className="profile-actions">

                        <button
                            className="edit-btn"
                        >
                            Edit Profile
                        </button>

                        <button
                            className="password-btn"
                            onClick={() => navigate("/citizen/change-password")}
                        >
                            🔐 Change Password
                        </button>

                    </div>

                        :

                        <div className="button-group">

                            <button
                                className="save-btn"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {

                                    setIsEditing(false);

                                    loadProfile();

                                }}
                            >
                                Cancel
                            </button>

                        </div>

                }

            </div>

        </div>

    );

}

export default Profile;