import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (studentNumber, password) => {
    const response = await axios.post(`${API_URL}/login`, { studentNumber, password });
    return response.data;
};
