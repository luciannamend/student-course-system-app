const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const jwt = require("jsonwebtoken");

const generateToken = (studentId) => {
    return jwt.sign({ id: studentId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

async function authenticateStudent(studentNumber, plainTextPassword, res) {

    try {
        // Retrieve the student by student number
        const student = await Student.findOne({ studentNumber });

        if (!student) {
            // If Student was not found
            return { success: false, message: 'Authentication failed. Student not found.' };
        }

        // Check if the provided password matches the stored hashed password
        const isMatch = await bcrypt.compare(plainTextPassword, student.password);

        console.log("IS IT MATCHING? " + isMatch);

        if (isMatch) {
            // Generate JWT token
            const token = generateToken(student._id);

            // Store token in HTTPOnly cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "development", // Secure only locally
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            return {success: true, message: "Authentication successful.", student};
        } else {
            return { success: false, message: "Authentication failed. Incorrect password." };
        }
    } catch (error) {
        // Handle errors
        return { success: false, message: 'An error occurred during authentication.', error };
    }
}

module.exports = { authenticateStudent };
