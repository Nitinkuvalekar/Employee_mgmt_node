// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    default: [],
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
