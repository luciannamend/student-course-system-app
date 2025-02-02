const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentNumber: {
        type: String,
        required: [true, "Student Number is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    address:{
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },
    city:{
        type: String,
        required: [true, "City is required"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    program:{
        type: String,
        required: [true, "Program is required"]
    },
    // two additional custom fields
    favoriteTopic:{
        type: String,
        required: false,        
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
