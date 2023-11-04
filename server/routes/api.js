// routes/api.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import your Mongoose model

// Create a new contact
router.post('/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a contact by ID
router.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a contact by ID
router.delete('/contacts/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(deletedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
