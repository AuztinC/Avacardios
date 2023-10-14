import React from "react";

const Pagination = ({productsPerPage, totalProducts, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className="pagination">
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