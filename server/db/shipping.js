const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchAddress = async()=> {
    const SQL = `
      SELECT *
      FROM shipping
    `;
    const response = await client.query(SQL);
    return response.rows;
  };

  const createAddress = async(addy)=> {
    const SQL = `
      INSERT INTO shipping (id, customer_name, street, city, state, zip) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), addy.customer_name, addy.street, addy.city, addy.state, addy.zip]);
    return response.rows[0];
  };
  
  module.exports = {
    fetchAddress,
    createAddress
  };