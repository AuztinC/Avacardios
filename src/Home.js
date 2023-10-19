import React from "react";
import { Link } from "react-router-dom";



const Home = ({ auth })=>{
    return(<>
    <main>
        <div className="hero-image">
            <h1>Welcome, </h1>
            <h3>Dont miss out of fresh deals! Peruse our produce!</h3>
            <Link to={'/products'}><button>Shop All</button></Link>
        </div>
        <div className="home-description">
            <p>
            Welcome to Avacardios, where we're on a mission to nourish your well-being through a bountiful selection of fresh produce and wholesome health foods. We believe that every bite should be a step toward a healthier, more vibrant you. From crisp, locally sourced fruits and vegetables to a curated collection of organic, nutrient-packed options, our virtual aisles are designed to support your journey to optimal health. With a commitment to quality, sustainability, and your satisfaction, we're your trusted partner in making nutritious choices effortless and delicious. Explore our virtual marketplace and embrace a lifestyle that celebrates the goodness of nature, one bite at a time.
            </p>
        </div>
        <div className="home-categories">
            
        { auth.vip || auth.is_admin ? 
            <div className="sweets">
                <Link to={'/category/sweets'}>
                    <div className="category">
                        <h2>Sweets</h2>
                    </div>
                </Link>
            </div>
        : null}
            <div className="other-categories">
                <Link to={'/category/protien'}>
                    <div className="category">
                        <h2>Protein</h2>
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