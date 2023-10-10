import React from "react";
import Products from "./Products";
import Cart from "./Cart";
import WishLists from "./WishLists";



const Home = ({ auth, products, cartItems, createLineItem, updateLineItem, cart, lineItems, updateOrder, removeFromCart, increaseQuantity, decreaseQuantity, wishLists})=>{
    
    return(<>
    <main>
        <Products
            auth = { auth }
            products={ products }
            cartItems = { cartItems }
            createLineItem = { createLineItem }
            updateLineItem = { updateLineItem }
            wishLists = { wishLists }
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
        <WishLists
        products = { products }
        wishLists = { wishLists }
        />
    </main>
    </>)
}
export default Home