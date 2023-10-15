import React, { useEffect } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';

const WishList = ({product, wishList, addWishList}) => {
  return (
    <div>
      {
        wishList ? null : <button onClick={() => addWishList({product_id: product.id})}>Add to Wish List</button>
      }
    </div>
  )
}

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishLists, addWishList})=> {

  const navigate=useNavigate();
  const {term}=useParams();
  let nonVipProducts = products.filter(product=>!product.vip)
  
  useEffect(()=>{
    nonVipProducts = products.filter(product=>!product.vip)
  }, [products])
  
  if(!products || !nonVipProducts){
    return null
  }
  return (
    <div className='products'>
      <h2>Products</h2>
      <input placeholder='search for a product' value={term||''} onChange={ev=>navigate(ev.target.value?`/products/search/${ev.target.value}`:'/products')}/>
      { auth.is_admin ? <button><Link to={'/createProduct'}>Create New Product</Link></button> : null}

        {
         auth.vip || auth.is_admin && auth.id ? 
          products.filter(prod=>!term||prod.name.toLowerCase().indexOf(term.toLowerCase())!==-1).map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <div key={ product.id }>
                <div>
                  {
                    product.image ? <img src={product.image}/> : null
                  }
                </div>
                <Link to={`/products/${product.id}`}>{ product.name }</Link>
                <div>
                  <p>${product.price.toFixed(2)}</p>
                  <p>Amount: {product.amount}</p>
                  <p>{product.description}</p>
                </div>
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
                {
                  auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} />: null
                }
                <hr/>
              </div>
            );
          })
        : 
          nonVipProducts.filter(prod=>!term||prod.name.toLowerCase().indexOf(term.toLowerCase())!==-1).map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <div key={ product.id }>
                <div>
                  {
                    product.image ? <img src={product.image}/> : null
                  }
                </div>
                { product.name }
                <div>
                  <p>${product.price.toFixed(2)}</p>
                  <p>Amount: {product.amount}</p>
                  <p>{product.description}</p>
                </div>
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
                {
                  auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} />: null
                }
                <hr/>
              </div>
            );
          })
        }

    </div>
  );
};

export default Products;
