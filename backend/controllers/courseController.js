const Course = require("../models/Course");
const Student = require("../models/Student");

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Get course by id
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course){
            return res.status(404).json({ error: "Course not found" });
        };
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a course
const createCourse = async (req, res) => {
    try {
        const { courseCode, courseName, section, semester, students } = req.body;

        // Validate students ref
        const studentRecords = await Student.find({ _id: { $in: students } });

        if (studentRecords.length !== students.length) {
            return res.status(400).json({ error: "Students not found." });
        }

        const course = new Course({
            courseCode,
            courseName,
            section,
            semester,
            students,
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update course
const updateCourse = async (req, res) => {
    try {
        const { courseCode, courseName, section, semester, students } = req.body;

        // validate students
        if (students) {
            const studentRecords = await Student.find({ _id: { $in: students } });
            if (studentRecords.length !== students.length) {
                return res.status(400).json({ error: "Some students do not exist." });
            }
        }
        // update and store course
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { courseCode, courseName, section, semester, students },
            { new: true, runValidators: true }
        );

        // if course was not updated, error 404
        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
