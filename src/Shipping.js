import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const DeleteAddress = ({ address, deleteAddress }) => {
  const handleDelete = async () => {
    try {
      await deleteAddress(address);
      toast.success('Address deleted successfully!', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } catch (error) {
      console.error('Error deleting Address:', error);
      toast.error('Error deleting Address. Please try again.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  return (
    <div>
      {address ? (
        <button onClick={handleDelete}>Remove address</button>
      ) : null}
    </div>
  );
};

const Addresses = ({ address, createAddress, deleteAddress })=> {
  const el = useRef();
  useEffect(()=> {
    try{
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
        console.log('Address created successfully!');
        toast.success('Address created successfully!', {
          position: toast.POSITION.BOTTOM_CENTER
      });
      });
    } catch (error) {
      console.error('Error creating Address:', error);
      toast.error('Error creating Address. Please try again.', {
      position: toast.POSITION.BOTTOM_CENTER
      });
    }
    }, [createAddress]);

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
