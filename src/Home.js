import React from "react";
import Products from "./Products";
import Cart from "./Cart";
import WishLists from "./WishLists";
import { Link } from "react-router-dom";



const Home = ({ auth, products, cartItems, createLineItem, updateLineItem, cart, lineItems, updateOrder, removeFromCart, increaseQuantity, decreaseQuantity, wishLists, addWishList, removeWishList})=>{
    return(<>
    <main>
        <div className="hero-image">
            <h1>Welcome, </h1>
            <h3>Dont miss out of fresh deals! Peruse our produce!</h3>
            <Link to={'/products'}><button>Shop All</button></Link>
        </div>
        <div className="home-description">
            <p>
                This is a good service
            </p>
        </div>
        <div className="home-categories">
            <Link to={'/category/sweets'}>
                <div className="category">
                    <h2>Sweets</h2>
                </div>
            </Link>
            <Link to={'/category/protien'}>
                <div className="category">
                    <h2>Protien</h2>
                </div>
            </Link>
            <Link to={'/category/fruit'}>
                <div className="category">
                    <h2>Fruits</h2>
                </div>
            </Link>
            <Link to={'/category/vegetable'}>
                <div className="category">
                    <h2>Vegetables</h2>
                </div>
            </Link>
        </div>
        {/* <Products
            auth = { auth }
            products={ products }
            cartItems = { cartItems }
            createLineItem = { createLineItem }
            updateLineItem = { updateLineItem }
            wishLists = { wishLists }
            addWishList = { addWishList }
            removeWishList={removeWishList}
        /> */}
    </main>
    </>)
}
export default Home