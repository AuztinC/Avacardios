const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchAddress = async(userId)=> {
    const SQL = `
      SELECT * FROM shipping
      WHERE user_id = $1
    `;
    const response = await client.query(SQL, [ userId ]);
    return response.rows;
  };

  const createAddress = async(addy)=> {
    const SQL = `
      INSERT INTO shipping (id, customer_name, street, city, state, zip, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), addy.customer_name, addy.street, addy.city, addy.state, addy.zip, addy.user_id]);
    return response.rows[0];
  };
  
  module.exports = {
    fetchAddress,
    createAddress
  };