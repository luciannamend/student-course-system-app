import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; // API call function

const Login = () => {
    const [studentNumber, setStudentNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    //const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginUser(studentNumber, password);
            localStorage.setItem("token", response.token); // Store JWT token
            console.log("USER AUTH SUCCESS");
            //navigate("/dashboard"); // Redirect after successful login
        } catch (err) {
            setError("Invalid student number or password");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Student Number"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
