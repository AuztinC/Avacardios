import React, { useState } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import Pagination from './Pagination';

const WishList = ({product, wishList, addWishList}) => {
  return (
    <div>
      {
        wishList ? null : <button onClick={() => addWishList({product_id: product.id})}>Add to Wish List</button>
      }
    </div>
  )
}

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishLists, addWishList, setProducts})=> {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const navigate=useNavigate();
  const {term}=useParams();

  
  if(!products){
    return null
  }
  return (
    <div className='products'>
      <h2>Products</h2>
      <input placeholder='search for a product' value={term||''} onChange={ev=>navigate(ev.target.value?`/products/search/${ev.target.value}`:'/products')}/>
       <button><Link to={'/createProduct'}>Create New Product</Link></button>
      <ul className='product-list'>
        {
          currentProduct.filter(prod=>!term||prod.name.toLowerCase().indexOf(term.toLowerCase())!==-1).map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                <div>
                  {
                    product.image ? <img src={product.image}/> : null
                  }
                </div>
                <h3>{ product.name }</h3>
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
              </li>
            );
          })
        }
      </ul>
      <Pagination 
      productsPerPage={productsPerPage} 
      totalProducts={products.length} 
      paginate={paginate}
      />
    </div>
  );
};

export default Products;
