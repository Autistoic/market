import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import {
  Route,
  Link
} from 'react-router-dom';

const ProductsList = () => {

  const { status, data, error } = useFetch('http://localhost:3004/products');

  const products = data;

  return (
    <div>
      {status === 'error' && <div>{error}</div>}
      {status === 'fetching' && <div>loading</div>}
      {status === 'fetched' && (
        <>
          {typeof products === 'undefined' || products.length === 0 && <div> No products found! </div>}

          {products.map((product) => (
            <Link to={{ pathname: '/product/' + product.id }} style={{ textDecoration: 'none' }}>
              <div key={product.id} style={{ display: 'flex' }}>
                <div>
                  <img src={product.imgs} width='160' height='160' />
                </div>
                <div  style={{ 'display': 'flex', 'flex-direction': 'column' }}>
                <div>{product.title}</div>
                <div>$ {product.price}</div>
                <div>★{product.score}</div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
      <div>
        <Link to={{ pathname: '/publicar/' }}>
          Agregar producto
        </Link>
      </div>
    </div>
  );
};



export default ProductsList;
