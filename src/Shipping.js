import React, { useState } from 'react';
import axios from 'axios';

function shippingForm({createAddress}) {
  const [customer, setCustomer] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleCreateAddress = async (ev) => {
    ev.preventDefault();
    setStreet('');
    setCity('');
    setState('');
    setPostalCode('');

    try {
      const addressResponse = await axios.post('http://localhost:3000/api/shipping', {
        customer_name,
        street,
        city,
        state,
        zip: postalCode
      });

      alert('Address created successfully!');
    } catch (error) {
      console.error('Error creating Address:', error);
    }
  };

  return (
    <div>
      <h1>Create Address</h1>
      <div>
        <label>Full Name:</label>
        <input type="text" value={customer} onChange={(ev) => setCustomer(ev.target.value)} />
      </div>
      <div>
        <label>Street:</label>
        <input type="text" value={street} onChange={(ev) => setStreet(ev.target.value)} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(ev) => setCity(ev.target.value)} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" value={state} onChange={(ev) => setState(ev.target.value)} />
      </div>
      <div>
        <label>Postal Code:</label>
        <input type="text" value={postalCode} onChange={(ev) => setPostalCode(ev.target.value)} />
      </div>
      <button onClick={handleCreateAddress}>Create Address</button>
    </div>
  );
}

export default shippingForm;
