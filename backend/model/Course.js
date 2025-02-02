const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      trim: true
    },
    courseName: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      trim: true
    },
    semester: {
      type: String,
      required: [true, "Semester is required"]
    },
    // refers to student collection
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
