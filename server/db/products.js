const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async(product)=> {
  const SQL = `
    INSERT INTO products (id, name, price, description, amount, image, vip) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.price, product.description, product.amount, product.image || null, product.vip]);
  return response.rows[0];
};
const updateProduct = async(product)=> {
  const SQL = `
    UPDATE products
    SET name=$2, price=$3, description=$4, amount=$5, image=$6, vip=$7
    WHERE id = $1
    RETURNING *
  `;
  const response = await client.query(SQL, [ product.id, product.name, product.price, product.description, product.amount, product.image || null, product.vip]);
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct
};
