import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const [studentNumber, setStudentNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {

            await axios.post("http://localhost:5000/api/auth/logout",
                { studentNumber, password },
                { withCredentials: true }
            );
            console.log("\nUSER LOGGED OUT");
            navigate("/login"); // Redirect to login
        }  catch (err) {
            setError("Invalid student number or password");
        }
    };

    return (
        <div className="login-container">
            <h2> Sorry to see you go :( </h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <p>Are you sure you want to logout? </p>

                <button className="btn-danger" type="submit"> Logout</button>
            </form>
        </div>
    );
};

export default Logout;
