import { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

const ManageCourse = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState(
        { courseCode: "", courseName: "", section: "", semester: "", students: []
        }
    );
    const [editingCourse, setEditingCourse] = useState(null);
    const [error, setError] = useState("");
    const COURSES_URL = "http://localhost:5000/api/courses";

    useEffect(() => {
        axios.get(COURSES_URL, { withCredentials: true })
            .then((response) => setCourses(response.data))
            .catch(() => setError( "Error fetching courses"));
        }, []
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingCourse) {
            setEditingCourse({ ...editingCourse, [name]: value });
        } else {
            setNewCourse({ ...newCourse, [name]: value });
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                COURSES_URL, newCourse, { withCredentials: true }
            );
            setCourses([...courses, response.data]);
            setNewCourse({ courseCode: "", courseName: "", section: "", semester: "", students: [] });
        } catch {
            setError( "Error creating course");
        }
    };

    const handleEditCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${COURSES_URL}/${editingCourse._id}`, editingCourse, { withCredentials: true }
            );
            setCourses(courses.map(course => course._id === editingCourse._id ? response.data : course));
            setEditingCourse(null);
        } catch {
            setError("Error updating course");
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(
                `${COURSES_URL}/${id}`, { withCredentials: true }
            );
            setCourses(courses.filter((course) => course._id !== id));
        } catch {
            setError("Error deleting course");
        }
    };

    return (
        <div>
            <h2>Manage Courses</h2>
            {error && <p className="error-message">{error}</p>}

            {/* Form for Creating or Editing Courses */}
            <CourseForm
                course={editingCourse || newCourse}
                onSubmit={editingCourse ? handleEditCourse : handleCreateCourse}
                onChange={handleInputChange}
                onCancel={() => setEditingCourse(null)}
            />

            {/* Display Course List with edit and delete actions */}
            <CourseList
                courses={courses}
                onEdit={setEditingCourse}
                onDelete={handleDeleteCourse}
                showActions={{ edit: true, delete: true, addStudent: false }}
            />
        </div>
    );
};

export default ManageCourse;
