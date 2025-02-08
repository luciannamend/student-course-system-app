import React, { useState } from "react";

const CourseActions = ({ course, onEdit, onDelete, onAddStudent, showActions }) => {
    const [studentId, setStudentId] = useState("");

    return (
        <div>
            {showActions.edit && <button onClick={() => onEdit(course)}>Edit</button>}
            {showActions.delete && <button className="btn-danger" onClick={() => onDelete(course._id)}>Delete</button>}

            {showActions.addStudent && (
                <>
                    <p>Students taking this course: </p>
                        <p> {course.students.join(" || ") || "None"} </p>

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
                </>
            )}
        </div>
    );
};

export default CourseActions;
