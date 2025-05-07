const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const { getUserContacts, createContact, updateContact, deleteContact, getContactById } = require("../controllers/contactController");

const router = express.Router();

// ✅ Get all contacts for logged-in user
router.get("/user/:userId", authenticateUser, getUserContacts);

// ✅ Get a single contact by ID (Required for `editContact.js`)
router.get("/:id", authenticateUser, getContactById); // ✅ Added route

// ✅ Create a new contact (Only logged-in users)
router.post("/", authenticateUser, createContact);

// ✅ Update an existing contact (Only logged-in users)
router.put("/:id", authenticateUser, updateContact);

// ✅ Delete a contact (Only logged-in users)
router.delete("/:id", authenticateUser, deleteContact);

module.exports = router;    