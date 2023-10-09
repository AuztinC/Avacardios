const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const createWishList = async(wish)=> {
    const SQL = `
    INSERT INTO wishlist (product_id, user_id, id) VALUES($1, $2, $3)
    RETURNING *
    `;
    response = await client.query(SQL, [wish.product_id, wish.user_id, uuidv4()]);
    return response.rows[0]
}

module.exports = {
    createWishList
  };