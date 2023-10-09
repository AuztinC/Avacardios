import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import api from './api';
import CreateUser from './CreateUser';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});

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
  }

  return (<>
    <div>
          <>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/products'>Products ({ products.length })</Link>
              {/* <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link> */}
              <Link to='/cart'>Cart ({ cartCount })</Link>
                { auth.id ? (<>
                  <span>Welcome back, { auth.username }!</span>
                  <button onClick={ logout }>logout</button>
                </>) : (<>
                  <Link to={'/login'}>Login</Link>
                  <Link to={'/signup'}>Sign Up</Link>
                </>) }
            </nav>
            <Home 
              auth = { auth }
              products={ products }
              cartItems = { cartItems }
              createLineItem = { createLineItem }
              updateLineItem = { updateLineItem }
              cart = { cart }
              lineItems = { lineItems }
              updateOrder = { updateOrder }
              removeFromCart = { removeFromCart }
              increaseQuantity = {increaseQuantity}
              decreaseQuantity = {decreaseQuantity}
            />
          </>
      </div>
    <Routes>
      <Route path='/' element={ <Home />}/>
      <Route path='signup' element={ <CreateUser createUser={ createUser }/>}/>
      <Route path='login' element={ <Login login={ login }/> } />
      
    </Routes>
  </>);
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
