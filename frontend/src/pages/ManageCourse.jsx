import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageCourse = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        courseCode: "",
        courseName: "",
        section: "",
        semester: "",
        students: [],
    });
    const [editingCourse, setEditingCourse] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all courses when the page loads
        axios.get("http://localhost:5000/api/courses", { withCredentials: true })
            .then((response) => setCourses(response.data))
            .catch((error) => setError("Error fetching courses"));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingCourse) {
            setEditingCourse({ ...editingCourse, [name]: value });
        } else {
            setNewCourse({ ...newCourse, [name]: value });
        }
    };

    // Create course
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            // Create a new course
            const response = await axios.post("http://localhost:5000/api/courses", newCourse, { withCredentials: true });
            setCourses([...courses, response.data]);
            setNewCourse({ courseCode: "", courseName: "", section: "", semester: "", students: [] });
        } catch (error) {
            setError("Error creating course");
        }
    };

    // Update course
    const handleEditCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/courses/${editingCourse._id}`, editingCourse,
                { withCredentials: true });
            setCourses(courses.map(course => course._id === editingCourse._id ? response.data : course));
            setEditingCourse(null);  // Close the edit form after submitting
        } catch (error) {
            setError("Error updating course");
        }
    };

    const handleStartEditing = (course) => {
        setEditingCourse(course);
    };

    // Delete course by id
    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`, { withCredentials: true });
            setCourses(courses.filter((course) => course._id !== id));
        } catch (error) {
            setError("Error deleting course");
        }
    };

    // form to create and course list display
    return (
        <div>
            <h2>Manage Courses</h2>
            {error && <p className="error-message">{error}</p>}

            {/* Create New Course Form */}
            <form onSubmit={handleCreateCourse}>
                <input
                    type="text"
                    name="courseCode"
                    placeholder="Course Code"
                    value={newCourse.courseCode}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={newCourse.courseName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="section"
                    placeholder="Section"
                    value={newCourse.section}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="semester"
                    placeholder="Semester"
                    value={newCourse.semester}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Create Course</button>
            </form>

            {/* Edit Course Form */}
            {editingCourse && (
                <form onSubmit={handleEditCourse}>
                    <h3>Edit Course</h3>
                    <input
                        type="text"
                        name="courseCode"
                        value={editingCourse.courseCode}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="courseName"
                        value={editingCourse.courseName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="section"
                        value={editingCourse.section}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="semester"
                        value={editingCourse.semester}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditingCourse(null)}>Cancel</button>
                </form>
            )}

            {/* Display Existing Courses */}
            <h3>Course List</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <p>{course.courseCode} ({course.section}) - {course.courseName} </p>
                        <button onClick={() => handleStartEditing(course)}>Edit</button>
                        <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCourse;
