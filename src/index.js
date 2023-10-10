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

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [reviews,setReviews]=useState([]);
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

  const createUser = async(user)=>{
    await api.createUser(user)
  }

  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const createReviews=async(review)=>{
    await api.createReviews({review,reviews,setReviews});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
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
  let upperCaseName = null
  if(auth.id){
    upperCaseName = auth.username.charAt(0).toUpperCase() + auth.username.slice(1)
  }
  return (<>
    <div>
          <>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/products'>Products ({ products.length })</Link>
              {/* <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link> */}
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <Link to='/reviews'>Reviews</Link>
                { auth.id ? (<>
                  <span>Welcome back, { upperCaseName }!</span>
                  <Dropdown />
                  <button onClick={ logout }>logout</button>
                </>) : (<>
                  <Link to={'/login'}>Login</Link>
                  <Link to={'/signup'}>Sign Up</Link>
                </>) }
            </nav>
          </>
    </div>
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
      /> }/>
      <Route path='signup' element={ <CreateUser createUser={ createUser }/> }/>
      <Route path='login' element={ <Login login={ login }/> } />
      {/* <Route path='account' element={ <UserProfile auth={ auth } orders={ orders } products={ products } lineItems={ lineItems }/> } /> */}
      <Route path='account/:id' element={ <UserProfile auth={ auth } orders={ orders } products={ products } lineItems={ lineItems }/> } />
      <Route path='/reviews' element={<Reviews reviews={reviews} setReviews={setReviews} products={products} createReviews={createReviews} auth={auth}/>}/>
    </Routes>
  </>);
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
