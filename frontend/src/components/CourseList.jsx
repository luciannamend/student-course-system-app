import React from "react";

const CourseList = ({ courses, onEdit, onDelete }) => {
    return (
        <div>
            <h3>Course List</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <p>{course.courseCode} ({course.section}) - {course.courseName}</p>
                        <button onClick={() => onEdit(course)}>Edit</button>
                        <button onClick={() => onDelete(course._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
