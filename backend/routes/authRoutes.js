const express = require('express');
const { authenticateStudent } = require('../service/authenticateStudent');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { studentNumber, password } = req.body;
    const result = await authenticateStudent(studentNumber, password);

    if (result.success) {
        res.status(200).json({ message: result.message, student: result.student });
    } else {
        res.status(401).json({ message: result.message });
    }
});

module.exports = router;
