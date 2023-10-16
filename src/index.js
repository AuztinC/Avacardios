import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import api from './api';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import Shipping from './Shipping';
import Nav from './Nav';
import Products from './Products';
import Cart from './Cart';
import CreateProduct from './CreateProduct';
import Product from './Product';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [users, setUsers] = useState([])
  const [auth, setAuth] = useState({});
  const [wishLists, setWishLists] = useState([]);
  const [reviews,setReviews]=useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [destination, setDestination] = useState('')
  const navigate = useNavigate()


  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    const fetchUsers = async()=>{
      await api.fetchUsers(setUsers)
    }
    fetchData();
    fetchUsers()
  }, []);

  useEffect(() => {
    if(auth.id){
      const fetchData = async() => {
        await api.fetchAddress(setAddress);
      };
      fetchData();
    };
  }, [auth]);
  
  useEffect(()=> {
    if(auth.id){
      const fetchOrders = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchOrders();
      
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
  
  const updateUser = async(user)=>{
    await api.updateUser({user, setUsers, users, setAuth})
  }

  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const createReviews=async(review)=>{
    await api.createReviews({review,reviews,setReviews});
  };

  const createAddress = async(addy)=>{
    await api.createAddress({addy, setAddress, address});
  };
  
  const createProduct = async(product)=>{
    await api.createProduct({product, setProducts, products})
  }

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

  const removeAddress = async(address)=> {
    await api.removeAddress({ addy, address, setAddress });
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

  const cartCount = lineItems.filter(lineItem => lineItem.order_id === cart.id).reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    cartItems.forEach((item)=>{
      removeFromCart(item); 
    })
    
    setOrders([])
    setLineItems([]);
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
        address = { address }
      /> }/>
      <Route path='signup' element={ <CreateUser createUser={ createUser }/> }/>
      
      <Route path='login' element={ <Login login={ login }/> } />
      
      <Route path='/products' element={ <Products products={products} cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} auth={auth} wishLists={wishLists} addWishList={addWishList} removeWishList={removeWishList} setProducts={setProducts}/>}/>
      
      <Route path='/products/:id' element={<Product products={products} reviews={reviews} setReviews={setReviews} createReviews={createReviews} cartItems={cartItems} updateLineItem={updateLineItem} createLineItem={createLineItem} wishLists={wishLists} addWishList={addWishList} removeWishList={removeWishList} auth={auth} />}/>

      <Route path='/products/search/:term' element={ <Products products={products} cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} auth={auth} wishLists={wishLists} addWishList={addWishList} removeWishList={removeWishList}/>}/>
      
      <Route path='/createProduct' element={ <CreateProduct createProduct={ createProduct }/>}/>
      
      <Route path='/cart' element={<Cart auth = {auth} updateOrder={updateOrder} removeFromCart={removeFromCart} lineItems={lineItems} cart={cart} products={products} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} address = {address} destination={destination} setDestination={setDestination}/>}/>
      
      <Route path='account/:id' element={ <UserProfile auth={ auth } orders={ orders } products={ products } lineItems={ lineItems } wishLists={ wishLists } removeWishList={ removeWishList } destination={destination} users={ users } updateUser={ updateUser }/> }  />
      
      <Route path='account/:id/:user' element={ <UserProfile auth={ auth } orders={ orders } products={ products } lineItems={ lineItems } wishLists={ wishLists } removeWishList={ removeWishList } users={ users }  updateUser={ updateUser }/> } />
      
      <Route path='/shipping' element={ <Shipping address={address} setAddress={setAddress} createAddress={createAddress} removeAddress={removeAddress} auth={auth}/>}/>
    </Routes>
  </>);
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
