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

  const createAddress = async(address)=> {
    const SQL = `
      INSERT INTO shipping (id, customer_name, street, state, zip, phone) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), address.customer_name, address.street, address.state, address.zip, address.phone]);
    return response.rows[0];
  };
  
  module.exports = {
    fetchAddress,
    createAddress
  };