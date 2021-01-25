import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import {
  Route,
  Link
} from "react-router-dom";

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
              <Link to={{ pathname: '/product/' + product.id }}>
                {product.title}{product.id}
              </Link>
            </div>
          ))}
        </>
      )}
      <div>
        <Link to={ {pathname: '/product/'}}>
          Agregar producto
        </Link>
      </div>
    </div>
  );
};



export default ProductsList;
