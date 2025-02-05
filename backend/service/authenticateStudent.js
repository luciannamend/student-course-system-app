const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

async function authenticateStudent(studentNumber, plainTextPassword) {
    try {
        // Retrieve the student by student number
        const student = await Student.findOne({ studentNumber });

        if (!student) {
            // If Student was not found
            return { success: false, message: 'Authentication failed. Student not found.' };
        }

        // Check if the provided password matches the stored hashed password
        const isMatch = await bcrypt.compare(plainTextPassword, student.password);

        if (isMatch) {
            // Passwords match
            return { success: true, message: 'Authentication successful.', student };
        } else {
            // Passwords do not match
            return { success: false, message: 'Authentication failed. Incorrect password.' };
        }
    } catch (error) {
        // Handle errors
        return { success: false, message: 'An error occurred during authentication.', error };
    }
}

module.exports = { authenticateStudent };
