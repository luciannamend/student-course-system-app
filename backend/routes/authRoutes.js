const express = require('express');
const { authenticateStudent } = require('../service/authenticateStudent');
const {verify} = require("jsonwebtoken");

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { studentNumber, password } = req.body;

    if (!studentNumber || !password) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    const authResponse = await authenticateStudent(studentNumber, password, res);

    if (authResponse.success) {
        res.status(200).json({ message: authResponse.message, student: authResponse.student });
    } else {
        res.status(401).json({ message: authResponse.message });
    }
});

// Middleware to check authentication
router.get("/check-auth", (req, res) => {
    try {
        const token = req.cookies.token; // Get token from cookies
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token" });
        }

        // Verify JWT
        const decoded = verify(token, process.env.JWT_SECRET);
        res.json({ authenticated: true, user: decoded });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
});


// POST /api/auth/logout
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, //  testing on localhost
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
