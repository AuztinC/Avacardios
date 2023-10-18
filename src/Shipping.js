import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DeleteAddress = ({address, deleteAddress}) => {
  return (
    <div>
      {
        address ? <button onClick={() => deleteAddress(address)}>Remove address</button>: null
      }
    </div>
  )
}

const Addresses = ({ address, createAddress, deleteAddress })=> {
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
      
  </>);
}

export default Addresses;
