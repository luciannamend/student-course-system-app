import React from "react";

const StudentList = ({ students}) => {
    return (
        <div>
            <h3>Student List</h3>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        <p>Student Number:<strong>{student.studentNumber}</strong> </p>
                        <p>Student Name: <strong>{student.firstName} {student.lastName}</strong></p>
                        <p>Student Id: <strong>{student._id}</strong> </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;