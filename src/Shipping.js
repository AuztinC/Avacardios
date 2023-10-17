import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DeleteAddress = ({address, deleteAddress}) => {
  // console.log(deleteAddress)
  return (
    <div>
      {
        address ? <button onClick={() => deleteAddress(address)}>Remove address</button>: null
      }
    </div>
  )
}

const Addresses = ({ address, createAddress, auth, destination, deleteAddress })=> {
  const el = useRef();
  useEffect(()=> {
      const options = {
        fields: [
          'formatted_address'
        ]
      };
      const autocomplete = new google.maps.places.Autocomplete(el.current, options);
      autocomplete.addListener('place_changed', async()=> {
        const place = autocomplete.getPlace();
        const address = { data: place };
        await createAddress(address);
        // console.log(address); 
        el.current.value = '';
      });
    });

  return (<>
    <div className='address'>
      <h2>Search address to add to account</h2>
      <input ref={ el } />
      <h3> Your addresses on file:</h3>
      <ol>
        {
          address.map( (address) => {
            // console.log(address)
            // const addy = address.find( address_ => address_.id === address.id)
            return (
              <li key={ address.id }>
                { address.data.formatted_address }
                <DeleteAddress address = {address} deleteAddress = { deleteAddress } />
              </li>
            );
          })
        }
      </ol>
    </div>
    {/* {
        auth.id ?  
            <>
            <h4>Deliver to:</h4>
              <select value={destination} onChange={e => setDestination(e.target.value)}>
              
                <option value="">Select an Address</option>
                {address.map(address => (
                  <option key={address.id} value={address.id}>
                    {auth.username} - {address.data.formatted_address}
                  </option>
                ))}
              </select>
            </>
         : null
      } */}
      
  </>);
}

export default Addresses;
