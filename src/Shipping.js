import React, { useState } from 'react';


function shippingForm({createAddress, auth, address, selectedAddress, setSelectedAddress}) {
  const [customer, setCustomer] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  
  const userAddresses = address.filter(addy => addy.user_id === auth.id);
  const handleCreateAddress = async (ev) => {
    try{
      ev.preventDefault();
      createAddress({ customer_name: customer, street: street, city: city, state: state, zip: postalCode, user_id: auth.id});
      setCustomer('');
      setStreet('');
      setCity('');
      setState('');
      setPostalCode('');

    // alert('Address created successfully!');
    } catch (error) {
      console.error('Error creating Address:', error);
    }
  };

  return (<>
    <div className='address'>
      <h2>Create Address</h2>
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
    {
      userAddresses.length > 0 ? (
        <>
        <h4>Edit Address:</h4>
          <select className='addy-dropdown' value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)}>
          
            <option value="">Select an Address</option>
            {userAddresses.map(address => (
              <option key={address.id} value={address.id}>
                {address.customer_name} - {address.street}, {address.city}, {address.state}
              </option>
            ))}
          </select>
        </>
        ) : (
          <p>No addresses available for delivery. Please add an address </p>
        )
      }
  </>);
}

export default shippingForm;
