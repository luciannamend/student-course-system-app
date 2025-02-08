import React, {useEffect, useState} from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import axios from "axios";
import CourseList from "../components/CourseList";

const ManageStudent = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState(
        { studentNumber: "", password: "", firstName: "", lastName: "", address: "", city: "",
            phoneNumber: "", email: "", program: "", favoriteTopic: "", isActive: ""
        }
    );
    const [error, setError] = useState("");
    const STUDENTS_URL = "http://localhost:5000/api/students";
    const [courses, setCourses] = useState([]);
    const COURSES_URL = "http://localhost:5000/api/courses";

    useEffect(() => {
        axios.get(STUDENTS_URL, {withCredentials: true})
            .then((response) => setStudents(response.data))
            .catch(() => setError( "Error fetching students"));
        }, []
    );

    useEffect(() => {
            axios.get(COURSES_URL, { withCredentials: true })
                .then((response) => setCourses(response.data))
                .catch(() => setError( "Error fetching courses"));
        }, []
    );

    // Check if there is at least one student with firstName === "Admin"
    const isAdmin = students.some(student => student.firstName === "Admin");
    if (!isAdmin) {
        return <p>Access Denied</p>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                STUDENTS_URL, newStudent, { withCredentials: true }
            );
            setStudents([...students, response.data]);
            setNewStudent({ studentNumber: "", password: "", firstName: "", lastName: "", address: "", city: "",
                phoneNumber: "", email: "", program: "", favoriteTopic: "", isActive: "" });
        } catch {
            setError(error.response?.data?.message || "Error creating student");
        }
    };

    const handleAddStudent = async (courseId, studentId) => {
        if (!studentId) return alert("Please enter a student ID");

        try {
            const updatedCourse = courses.find(course => course._id === courseId);
            const newStudentsList = [...updatedCourse.students, studentId];

            const response = await axios.put(`${COURSES_URL}/${courseId}`,
                { ...updatedCourse, students: newStudentsList },
                { withCredentials: true }
            );

            setCourses(courses.map(course => course._id === courseId ? response.data : course));
        } catch (error) {
            setError("Error adding student to course");
        }
    };

    return (
        <div>
            <h2>Manage Student </h2>
            {error && <p className="error-message">{error}</p>}

            {/* Form for Creating Student */}
            <StudentForm
                student={newStudent}
                onSubmit={handleCreateStudent}
                onChange={handleInputChange}
                onCancel={() => setNewStudent(null)}
            />

            {/* Display Students List */}
            <StudentList
                students={students}
            />

            {/* Display Course List without edit and delete actions */}
            <CourseList
                courses={courses}
                onAddStudent={handleAddStudent}
                showActions={{ addStudent: true }}
            />

        </div>
    );
};

export default ManageStudent;