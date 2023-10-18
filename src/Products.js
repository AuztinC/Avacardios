import React, { useState, useEffect } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import Pagination from './Pagination';
import WishList from './WishList';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishLists, addWishList, setProducts, removeWishList})=> {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const nonVipProducts = products.filter(product=>!product.vip);
  const currentProduct = nonVipProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const vipProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, left: 0, behavior:'instant'})
  };

  const navigate=useNavigate();
  const {term}=useParams();
  
  if(!products || !nonVipProducts){
    return null
  }

  return (
    <div className='products'>
      <h2>Products</h2>
      <input placeholder='search for a product' value={term||''} onChange={ev=>navigate(ev.target.value?`/products/search/${ev.target.value}`:'/products')}/>
      {auth.is_admin ? <Link to={'/createProduct'}><button>Create New Product</button></Link> : null}
      {!term ?
        <div className='products-container'>
        {auth.vip || auth.is_admin ?

          vipProducts.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <div key={ product.id } className='product-div'>
                <div className='products-image-div'>
                  {
                    product.image ? <img src={product.image}/> : null
                  }
                </div>
                <hr/>
                {product.vip ? 
                <div>
                  <Link to={`/products/${product.id}`}>{ product.name }</Link>
                  <h2 className='vip'>VIP</h2>
                  <p>${product.price.toFixed(2)}</p>
                  <p>Amount: {product.amount}</p>
                  {/* <p>{product.description}</p> */}
                </div>
                :
                <div>
                  <Link to={`/products/${product.id}`}>{ product.name }</Link>
                  <p>${product.price.toFixed(2)}</p>
                  <p>Amount: {product.amount}</p>
                  {/* <p>{product.description}</p> */}
                </div>
                }
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
            );
          }) :
          currentProduct.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (<>
              <div key={ product.id } className='product-div'>
                <div className='products-image-div'>
                  {
                    product.image ? <img src={product.image}/> : null
                  }
                </div>
                <hr/>
                <Link to={`/products/${product.id}`}>{ product.name }</Link>
                <div>
                  <p>${product.price.toFixed(2)}</p>
                  <p>Amount: {product.amount}</p>
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
                <div className='wish-space'>
                  {
                    auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} removeWishList={removeWishList}/>: null
                  }
                </div>
                <hr/>
              </div>
            </>);
          })
        }
        <div style={{
          width: "100%",
          position: 'static',
          bottom: '0px'
        }}>
          <Pagination 
          productsPerPage={productsPerPage} 
          totalProducts={products.length} 
          paginate={paginate}
          auth={auth}
          products={products}
          />
        </div>
      </div>

        : 

        auth.vip ?
        products.filter(prod=>!term||prod.name.toLowerCase().indexOf(term.toLowerCase())!==-1).map( product => {
          const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
          return (
            <div key={ product.id } className='product-div'>
              <div className='products-image-div'>
                {
                  product.image ? <img src={product.image}/> : null
                }
              </div>
              <hr/>
              <Link to={`/products/${product.id}`}>{ product.name }</Link>
              <div>
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
                auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} removeWishList={removeWishList}/>: null
              }
            </div>
          );
        }) :
        nonVipProducts.filter(prod=>!term||prod.name.toLowerCase().indexOf(term.toLowerCase())!==-1).map( product => {
          const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
          return (
            <div key={ product.id } className='product-div'>
              <div className='products-image-div'>
                {
                  product.image ? <img src={product.image}/> : null
                }
              </div>
              <hr/>
              <Link to={`/products/${product.id}`}>{ product.name }</Link>
              <div>
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
                auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} removeWishList={removeWishList}/>: null
              }
            </div>
          );
        })
      }
    </div>
  );
};



export default Products;