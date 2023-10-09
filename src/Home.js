import React from "react";
import Products from "./Products";
import Cart from "./Cart";


const Home = ({ auth, products, cartItems, createLineItem, updateLineItem, cart, lineItems, updateOrder, removeFromCart, increaseQuantity, decreaseQuantity})=>{
    
    return(<>
    <main>
        <Products
            auth = { auth }
            products={ products }
            cartItems = { cartItems }
            createLineItem = { createLineItem }
            updateLineItem = { updateLineItem }
        />
        <Cart
            cart = { cart }
            lineItems = { lineItems }
            products = { products }
            updateOrder = { updateOrder }
            removeFromCart = { removeFromCart }
            increaseQuantity = { increaseQuantity }
            decreaseQuantity = { decreaseQuantity }
        />
        {/* <Orders
            orders = { orders }
            products = { products }
            lineItems = { lineItems }
        /> */}
    </main>
    </>)
}
export default Home