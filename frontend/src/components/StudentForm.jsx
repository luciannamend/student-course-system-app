import React from "react";

const StudentForm = ({ student, onSubmit, onChange, onCancel }) => {
    return (
        <form onSubmit={onSubmit}>
            <h3>{student._id ? "Edit student" : "Create student"}</h3>
            <input
                type="text"
                name="studentNumber"
                placeholder="Student Number"
                value={student.studentNumber}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="password"
                placeholder="Password"
                value={student.password}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={student.firstName}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={student.lastName}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={student.address}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={student.city}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={student.phoneNumber}
                onChange={onChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="program"
                placeholder="Program"
                value={student.program}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="favoriteTopic"
                placeholder="Favorite Topic"
                value={student.favoriteTopic}
                onChange={onChange}
            />
            <input
                type="text"
                name="isActive"
                placeholder="Active (true or false)"
                value={student.isActive}
                onChange={onChange}
            />
            <button type="submit">{student._id ? "Save Changes" : "Create Student"}</button>
            {student._id && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default StudentForm;
