import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials: true })
            .then(response => {
                setIsAuthenticated(true);
                setUser(response.data.user);
            })
            .catch(() => setIsAuthenticated(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    if(adminOnly && user !== "67a6a27ea2bab7de269aa940"){ // If it's not Admin id, then access id denied
        return <p> ACCESS DENIED </p>
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
