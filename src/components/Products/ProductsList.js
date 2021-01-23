import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';


const ProductsList = () => {

  const { status, data, error } = useFetch("http://localhost:3004/products");

  const products = data;

  return (
    <div>      
      {status === 'error' && <div>{error}</div>}
      {status === 'fetching' && <div>loading</div>}
      {status === 'fetched' && (
        <>
          {typeof products === 'undefined' || products.length === 0 && <div> No products found! </div>}

          {products.map((product) => (
            <div key={product.id}>
              {product.title}{product.id}
            </div>
          ))}
        </>
      )}
    </div>
  );
};



export default ProductsList;
