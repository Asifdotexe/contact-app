import React, { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactForm.css';

function ContactForm({ onContactAdded }) {
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  const handleInputChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    // Send a POST request to create a new contact
    Axios.post('/api/contacts', contact) // Make sure the API route is correct
      .then((response) => {
        // Notify the parent component of the new contact
        onContactAdded(response.data);

        // Clear the form
        setContact({ name: '', email: '', phone: '' });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form className="form">
        <div className="form-group">
          <h2>Add Contact</h2>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            name="phone"
            placeholder="Phone"
            value={contact.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
