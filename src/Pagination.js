import React from "react";

const Pagination = ({productsPerPage, totalProducts, paginate, auth, products}) => {
    const vipProducts = products.filter(product => product.vip);
    const pageNumbers = [];

    if(!auth.vip){
        for(let i = 1; i <= Math.ceil((totalProducts - vipProducts.length) / productsPerPage); i++){
            pageNumbers.push(i);
        }
    } else {
        for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++){
            pageNumbers.push(i);
    }
    }

    return (
        <nav>
            <div className="pagination" style={{
          textAlign: 'ceneter',
          width: "100%",
          position: 'static',
          bottom: '0px'
        }}>
                {
                    pageNumbers.map(number => (
                        <span key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </span>
                    ))
                }
            </div>
        </nav>
    )
}

export default Pagination