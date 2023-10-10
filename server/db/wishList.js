const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const createWishList = async(wish)=> {
    const SQL = `
    INSERT INTO wishlist (product_id, user_id, id) VALUES($1, $2, $3) RETURNING *
  `;
   response = await client.query(SQL, [ wish.product_id, wish.user_id, uuidv4()]);
    return response.rows[0];
  };

  const fetchWishList = async(userId)=> {
    const SQL = `
      SELECT * FROM wishlist
      WHERE user_id = $1
    `;
    const response = await client.query(SQL, [ userId ]);
    return response.rows;
  };

  const deleteWishList = async(wish)=> {
    const SQL = `
      DELETE from wishlist
      WHERE id = $1 and user_id = $2
    `;
    await client.query(SQL, [wish.id, wish.user_id]);
  };


  module.exports = {
    createWishList,
    fetchWishList,
    deleteWishList
  };