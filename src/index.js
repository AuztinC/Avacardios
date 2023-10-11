import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import api from './api';
import Reviews from './Reviews';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import Dropdown from './Dropdown';
import Shipping from './Shipping';
import Nav from './Nav';
import Products from './Products';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [wishLists, setWishLists] = useState([]);
  const [reviews,setReviews]=useState([]);
  const [address, setAddress] = useState([]);
  const navigate = useNavigate()


  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if(auth.id){
  //     const fetchData = async() => {
  //       await api.fetchAddress(setAddress);
  //     };
  //     fetchData();
  //   }
  // })
  
  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchWishList(setWishLists);
      };
      fetchData();
    }
  }, [auth]);


  const createUser = async(user)=>{
    await api.createUser(user)
  }

  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const createReviews=async(review)=>{
    await api.createReviews({review,reviews,setReviews});
  };

  const createAddress = async(addy)=>{
    await api.createAddress({addy, address, setAddress});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const addWishList = async(wishList)=> {
    await api.addWishList({ wishList, setWishLists, wishLists });
  };

  const removeWishList = async(wishList)=> {
    await api.removeWishList({ wishList, wishLists, setWishLists });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const increaseQuantity = async(lineItem)=> {
    await api.increaseQuantity({lineItem, lineItems, setLineItems})
  }

  const decreaseQuantity = async(lineItem)=> {
    await api.decreaseQuantity({lineItem, lineItems, setLineItems})
  }

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
    navigate('/')
    
  }

  return (<>
    <Nav cartCount={ cartCount } login={ login } auth={ auth } logout={ logout }/>
    
    <Routes>
      <Route path='/' element={ <Home 
        auth = { auth }
        products={ products }
        cartItems = { cartItems }
        createLineItem = { createLineItem }
        updateLineItem = { updateLineItem }
        cart = { cart }
        lineItems = { lineItems }
        updateOrder = { updateOrder }
        removeFromCart = { removeFromCart }
        increaseQuantity = { increaseQuantity }
        decreaseQuantity = { decreaseQuantity }
        wishLists = { wishLists }
        addWishList = { addWishList }
        removeWishList  = { removeWishList }
        createAddress = { createAddress }
      /> }/>
      <Route path='signup' element={ <CreateUser createUser={ createUser }/> }/>
      <Route path='login' element={ <Login login={ login }/> } />
      <Route path='/products' element={ <Products products={products} cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} auth={auth} wishLists={wishLists} addWishList={addWishList}/>}/>
      <Route path='account/:id' element={ <UserProfile auth={ auth } orders={ orders } products={ products } lineItems={ lineItems } wishLists={ wishLists } removeWishList={ removeWishList }/> } />
      <Route path='/reviews' element={<Reviews reviews={reviews} setReviews={setReviews} products={products} createReviews={createReviews} auth={auth}/>}/>
      <Route path='/shipping' element={ <Shipping address={address} setAddress={setAddress} createAddress={createAddress}/>}/>
    </Routes>
  </>);
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
