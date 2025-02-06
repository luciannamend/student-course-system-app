import React from "react";

const CourseForm = ({ course, onSubmit, onChange, onCancel }) => {
    return (
        <form onSubmit={onSubmit}>
            <h3>{course._id ? "Edit Course" : "Create Course"}</h3>
            <input
                type="text"
                name="courseCode"
                placeholder="Course Code"
                value={course.courseCode}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                value={course.courseName}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="section"
                placeholder="Section"
                value={course.section}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="semester"
                placeholder="Semester"
                value={course.semester}
                onChange={onChange}
                required
            />
            <button type="submit">{course._id ? "Save Changes" : "Create Course"}</button>
            {course._id && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default CourseForm;
