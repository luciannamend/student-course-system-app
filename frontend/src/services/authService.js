import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (studentNumber, password) => {
    const response = await axios.post(`${API_URL}/login`, { studentNumber, password });
    return response.data;
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Logout failed");

        return response.json();
    } catch (error) {
        console.error("Logout error:", error);
    }
};

