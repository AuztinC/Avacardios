import axios from 'axios';
import { firebaseAuth, firebaseProvider} from './FirebaseConfig'
import { signInWithPopup } from 'firebase/auth';




const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchUsers = async(setUsers)=>{
  const response = await axios.get('/api/users');
  setUsers(response.data)
}

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};
const fetchAllOrders = async(setAllOrders)=> {
  const response = await axios.get('/api/orders/allOrders', getHeaders());
  setAllOrders(response.data);
};

const fetchReviews=async(setReviews)=>{
  const response=await axios.get('/api/reviews');
  setReviews(response.data);
}

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const fetchWishList = async(setWishLists)=> {
  const response = await axios.get('/api/wishList', getHeaders());
  setWishLists(response.data)
}

const fetchAddress = async(setAddress) => {
  const response = await axios.get('/api/shipping', getHeaders());
  setAddress(response.data)
}

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const createProduct = async({ product, setProducts, products})=>{
  const response = await axios.post('/api/products', product, getHeaders())
  setProducts( products.map(_product=>_product.id === response.data.id ? response.data : _product) )
}

const createAddress = async({addy, setAddress, address}) => {
  const response = await axios.post('/api/shipping', addy, getHeaders())
  setAddress([...address,response.data]);
}

const updateProduct = async({product, products, setProducts})=>{
  const response = await axios.put(`/api/products/${product.id}`, product, getHeaders())
  console.log(response.data)
}

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, {is_cart: order.is_cart, shipping_id: order.shipping_id}, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
  setAllOrders([...allOrders, response.data])
};

const updateUser = async({ user, setUsers, users, setAuth })=> {
  const response = await axios.put(`/api/me/${user.id}`, user);
  setUsers(users.map(_user=>_user.id === response.data.id ? response.data : _user));
  setAuth(response.data)
};

const addWishList = async({ wishList, setWishLists, wishLists })=> {
  const response = await axios.post('/api/wishList', wishList, getHeaders());
  setWishLists([...wishLists, response.data]);
};

const removeWishList = async({ wishList, wishLists, setWishLists })=> {
  await axios.delete(`/api/wishList/${wishList.id}`, getHeaders());
  setWishLists(wishLists.filter(wish => wish.id != wishList.id))
};

const deleteAddress = async({ addy, address, setAddress })=> {
  await axios.delete(`/api/shipping/${addy.id}`, getHeaders());
  setAddress(address.filter(addy_ => addy_.id != addy.id))
};

const removeFromCart = async({ lineItem, lineItems, setLineItems })=> {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const increaseQuantity = async({lineItem, lineItems, setLineItems})=> {
  const newQuantity = lineItem.quantity + 1;
 const {data} = await axios.put(`/api/lineItems/${lineItem.id}`,
    {
      order_id: lineItem.order_id,
      product_id: lineItem.product_id,
      quantity: newQuantity
    },
    getHeaders()
  );
  const newLineItems = lineItems.map((lineMap) => {
    if(lineMap.id === lineItem.id){
      return data
    } else {
      return lineMap
    }
  });
  setLineItems(newLineItems)
}

const decreaseQuantity = async({lineItem, lineItems, setLineItems})=> {
  const newQuantity = lineItem.quantity - 1;
 const {data} = await axios.put(`/api/lineItems/${lineItem.id}`,
    {
      order_id: lineItem.order_id,
      product_id: lineItem.product_id,
      quantity: newQuantity
    },
    getHeaders()
  );
  const newLineItems = lineItems.map((lineMap) => {
    if(lineMap.id === lineItem.id){
      return data
    } else {
      return lineMap
    }
  });
  setLineItems(newLineItems)
}

const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      // console.log('response', response.data)
      setAuth(response.data);
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}

const createUser = async({user, users, setUsers})=>{
  const response = await axios.post('/api/signup', user)
  setUsers([...users, response.data])
  return response
}

const createReviews=async({review, reviews, setReviews})=>{
  const response=await axios.post('/api/reviews',review)
  setReviews([...reviews,response.data]);
}


const handleGithubLogin= async(users, setUsers)=>{
  let user = null
  await signInWithPopup(firebaseAuth, firebaseProvider).then(async(result)=>{
    user = users.find(_user=>_user.username === result.user.reloadUserInfo.screenName)
    if(!user){
      user = {
        username: result.user.reloadUserInfo.screenName,
        password: result.user.accessToken,
        is_admin: false,
        image: result.user.reloadUserInfo.photoUrl
      }
      createUser({user, users, setUsers})
    } else {
      user = {
        username: result.user.reloadUserInfo.screenName,
        password: result.user.accessToken,
        is_admin: false,
        image: result.user.reloadUserInfo.photoUrl
      }
    }
  }).catch((err)=>{
    console.log(err)
  })
  // console.log(user)
  return {username: user.username, password: user.password}
}

const api = {
  login,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchWishList,
  fetchUsers,
  updateUser,
  createLineItem,
  updateLineItem,
  updateOrder,
  updateProduct,
  removeFromCart,
  attemptLoginWithToken,
  increaseQuantity,
  decreaseQuantity,
  createUser,
  addWishList,
  removeWishList,
  createReviews,
  fetchReviews,
  fetchAddress,
  createAddress,
  createProduct,
  handleGithubLogin,
  deleteAddress,
  fetchAllOrders
};

export default api;
