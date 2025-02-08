import React, { useState } from "react";

const CourseActions = ({ course, onEdit, onDelete, onAddStudent, showActions }) => {
    const [studentId, setStudentId] = useState("");

    return (
        <div>
            {showActions.edit && <button onClick={() => onEdit(course)}>Edit</button>}
            {showActions.delete && <button className="btn-danger" onClick={() => onDelete(course._id)}>Delete</button>}

            {showActions.addStudent && (
                <div className="course-action">
                    <p>Students taking this course: </p>
                        <p><strong> {course.students.join(", ") || "None"} </strong></p>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Enter Student ID"
                    />
                    <button onClick={() => {
                        onAddStudent(course._id, studentId);
                        setStudentId(""); // Clear input after adding
                    }}>
                        Add Student
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseActions;
