const Contact = require('../models/Contact');

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving contacts' });
    }
};
const getContactById = async (req, res) => {
    try {
        const contactId = req.params.id;
        console.log("Fetching contact ID:", contactId); // ✅ Debugging output

        const contact = await Contact.findOne({ where: { idaddresses: contactId } }); // ✅ Correct column name

        if (!contact) {
            console.log("Contact not found"); // ✅ Debug missing contacts
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({ error: "Error fetching contact", details: error.message });
    }
};
// Get contacts by user ID
const getUserContacts = async (req, res) => {
    try {
        const userId = req.user.id;
        const contacts = await Contact.findAll({
            where: { user_id: userId },
            attributes: ["idaddresses", "full_name", "phone_number", "address"] // ✅ Correct column names
        });

        console.log("Fetched contacts:", contacts); // ✅ Debugging output
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Error retrieving contacts" });
    }
};
// Create a new contact
const createContact = async (req, res) => {
    try {
        console.log("Received contact data:", req.body); // ✅ Debug request input

        const { full_name, phone_number, address } = req.body;

        if (!full_name || !phone_number || !address) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newContact = await Contact.create({
            full_name,
            phone_number,
            address,
            user_id: req.user.id // ✅ Ensure user ID is linked
        });

        res.status(201).json({ message: "Contact added successfully!", contact: newContact });

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Error creating contact", details: error.message });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        await contact.destroy();
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting contact' });
    }
};
const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const tokenUserId = req.user.id;

        // ✅ Ensure query uses correct column name (`idaddresses`)
        const contact = await Contact.findOne({ where: { idaddresses: contactId, user_id: tokenUserId } });

        if (!contact) {
            return res.status(404).json({ error: "Contact not found or unauthorized to edit" });
        }

        await contact.update(req.body);
        res.status(200).json({ message: "Contact updated successfully!", contact });

    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Error updating contact", details: error.message });
    }
};

module.exports = { getAllContacts, getUserContacts, createContact, deleteContact, updateContact, getContactById };
