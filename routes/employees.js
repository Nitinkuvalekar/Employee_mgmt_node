// routes/employees.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.YOUR_CLOUD_NAME,
  api_key: process.env.YOUR_API_KEY,
  api_secret: process.env.YOUR_API_SECRET,
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "employee-photos", // Optional folder for storing images
    format: async (req, file) => "jpg", // Format of the uploaded images
    public_id: (req, file) => `employee-photo-${Date.now()}`, // Public ID of the image file
  },
});

const parser = multer({ storage: storage });

// POST /api/employees
router.post("/", parser.array("photos", 5), async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const photos = req.files.map((file) => file.path);
    const employee = new Employee({ name, email, mobile, photos });
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: "Error saving the employee" });
  }
});

// GET /api/employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving employees" });
  }
});

module.exports = router;
