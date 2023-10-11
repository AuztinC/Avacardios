import React, { useState } from 'react';


function shippingForm({createAddress}) {
  const [customer, setCustomer] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const handleCreateAddress = async (ev) => {
    try{
    ev.preventDefault();
    setCustomer('');
    setStreet('');
    setCity('');
    setState('');
    setPostalCode('');
    createAddress({ customer_name: customer, street: street, city: city, state: state, zip: postalCode });

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
      <button onClick={handleCreateAddress} disabled={ !customer || !street || !city || !state || !postalCode }>Create Address</button>
    </div>
  );
}

export default shippingForm;
