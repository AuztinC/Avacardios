const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { fetchOrders } = require('./cart');

const findUserByToken = async(token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT id, username, is_admin, image, vip
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if(!response.rows.length){
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  }
  catch(ex){
    console.log(ex);
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

const authenticate = async(credentials)=> {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username]);
  if(!response.rows.length){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(credentials.password, response.rows[0].password);
  if(!valid){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  
  // fetchOrders({username: credentials.username, id: response.rows[0].id})
  
  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

const createUser = async(user)=> {
  if(!user.username.trim() || !user.password.trim()){
    throw Error('must have username and password');
  }
  const users = await client.query(`SELECT * FROM users`)
  if(users.rows.find(_user=>_user.username === user.username)){
    const error = Error('Username Already Exists');
    error.status = 401;
    throw error;
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
    INSERT INTO users (id, username, password, is_admin, vip) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), user.username, user.password, user.is_admin, user.vip ]);
  return response.rows[0];
};

const fetchUsers = async()=>{
  const SQL = `SELECT * from users`
  const response = await client.query(SQL)
  return response.rows
}

const updateUser = async(user)=>{
  const SQL = `
  UPDATE users
  SET username = $1, image = $2, vip = $3
  where id = $4
  RETURNING *
  `;
  const response = await client.query(SQL, [ user.username, user.image, user.vip, user.id  ])
  return response.rows[0]
}

module.exports = {
  createUser,
  authenticate,
  findUserByToken,
  fetchUsers,
  updateUser
};
