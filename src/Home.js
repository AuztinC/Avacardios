import React from "react";
import Products from "./Products";
import Cart from "./Cart";
import WishLists from "./WishLists";



const Home = ({ auth, products, cartItems, createLineItem, updateLineItem, cart, lineItems, updateOrder, removeFromCart, increaseQuantity, decreaseQuantity, wishLists, addWishList, removeWishList})=>{
    
    return(<>
    <main>
        <Products
            auth = { auth }
            products={ products }
            cartItems = { cartItems }
            createLineItem = { createLineItem }
            updateLineItem = { updateLineItem }
            wishLists = { wishLists }
            addWishList = { addWishList }
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
        {auth.id || auth.is_admin ? <WishLists
        products = { products }
        wishLists = { wishLists }
        removeWishList = { removeWishList }
        /> : null} 
    </main>
    </>)
}
export default Home