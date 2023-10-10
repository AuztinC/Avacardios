import axios from 'axios';
import WishLists from '../WishLists';

const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const fetchWishList = async(setWishLists)=> {
  const response = await axios.get('/api/wishList', getHeaders());
  setWishLists(response.data)
}

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const addWishList = async({ wishList, setWishLists, wishLists })=> {
  const response = await axios.post('/api/wishList', wishList, getHeaders());
  setWishLists([...wishLists, response.data]);
};

const removeWishList = async({ wishList, wishLists, setWishLists })=> {
  await axios.delete(`/api/wishList/${wishList.id}`, getHeaders());
  setWishLists(wishLists.filter(wish => wish.id != wishList.id))
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

const createUser = async({user})=>{
  const response = await axios.post('/api/signup', user)
  return response
}

const api = {
  login,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchWishList,
  createLineItem,
  updateLineItem,
  updateOrder,
  removeFromCart,
  attemptLoginWithToken,
  increaseQuantity,
  decreaseQuantity,
  createUser,
  addWishList,
  removeWishList
};

export default api;
