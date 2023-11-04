import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the server when the component mounts
    Axios.get('/api/contacts')
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => console.error(error));
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  const handleDelete = (id) => {
    // Send a DELETE request to remove a contact
    Axios.delete(`/api/contacts/${id}`)
      .then(() => {
        setContacts(contacts.filter((contact) => contact._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} | {contact.email} | {contact.phone}
            <button onClick={() => handleDelete(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
