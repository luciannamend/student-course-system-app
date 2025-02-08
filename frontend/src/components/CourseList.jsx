import CourseActions from "./CourseActions";

const CourseList = ({ courses, onEdit, onDelete, onAddStudent, showActions = {} }) => {
    return (
        <div>
            <h3>Course List</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <p>{course.courseCode} ({course.section}) - {course.courseName}</p>
                        
                        <CourseActions
                            course={course}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddStudent={onAddStudent}
                            showActions={showActions}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
