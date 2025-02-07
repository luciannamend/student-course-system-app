import React from "react";

const StudentList = ({ students}) => {
    return (
        <div>
            <h3>Student List</h3>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        <p>{student.studentNumber} - {student.firstName} {student.lastName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;