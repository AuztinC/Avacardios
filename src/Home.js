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
        <Products
            auth = { auth }
            products={ products }
            cartItems = { cartItems }
            createLineItem = { createLineItem }
            updateLineItem = { updateLineItem }
            wishLists = { wishLists }
            addWishList = { addWishList }
            removeWishList={removeWishList}
        />
        {/* <Cart
            cart = { cart }
            lineItems = { lineItems }
            products = { products }
            updateOrder = { updateOrder }
            removeFromCart = { removeFromCart }
            increaseQuantity = { increaseQuantity }
            decreaseQuantity = { decreaseQuantity }
        /> */}
        {/* <Orders
            orders = { orders }
            products = { products }
            lineItems = { lineItems }
        /> */}
        {/* {auth.id || auth.is_admin ? <WishLists
        products = { products }
        wishLists = { wishLists }
        removeWishList = { removeWishList }
        /> : null}  */}
    </main>
    </>)
}
export default Home