import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import WishList from "./WishList";
import Pagination from './Pagination';


const CategoryProducts = ({products, cartItems, createLineItem, updateLineItem, auth, wishLists, addWishList, setProducts, removeWishList})=>{
    const { id } = useParams()
    const currentProducts = products.filter(product=>product.category === id)
    
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentPageProduct = currentProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({top: 0, left: 0, behavior:'instant'})
    };
    
    useEffect(()=>{
      window.scrollTo({top: 0, left: 0, behavior:'instant'})
    }, [])
    
    return (
    <div className='products'>
        <div className='products-container'>
    {
        currentPageProduct.map(product=>{
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
                <div key={ product.id } className='product-div'>
                <div className='products-image-div'>
                  {
                    product.image ? <img src={product.image}/> : null
                  }
                </div>
                <hr/>

                <div key={ product.id }>
                  <Link to={`/products/${product.id}`}>{ product.name }</Link>
                  <p>${product.price.toFixed(2)}</p>
                  <p>Amount: {product.amount}</p>
                  {/* <p>{product.description}</p> */}
                </div>
                
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add to Cart</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
                {
                  auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} removeWishList={removeWishList} auth={auth}/>: null
                }
              </div>
            )
        })
    }
    </div>
    <div style={{
          width: "100%",
          position: 'static',
          bottom: '0px'
        }}>
          <Pagination 
          productsPerPage={productsPerPage} 
          totalProducts={currentProducts.length} 
          paginate={paginate}
          auth={auth}
          products={currentProducts}
          />
        </div>
    </div>)
}
export default CategoryProducts