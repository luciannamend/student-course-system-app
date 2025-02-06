const express = require('express');
const { authenticateStudent } = require('../service/authenticateStudent');

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
