const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchAddress = async(userId)=> {
    const SQL = `
      SELECT shipping. * 
      FROM 
      shipping
      JOIN users
      ON users.id = shipping.user_id
      WHERE user_id = $1
    `;
    const response = await client.query(SQL, [ userId ]);
    return response.rows;
  };

  const createAddress = async(addy)=> {
    const SQL = `
      INSERT INTO shipping (id, data, user_id) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), addy.data, addy.user_id]);
    return response.rows[0];
  };
  
  module.exports = {
    fetchAddress,
    createAddress
  };