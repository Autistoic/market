import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import {
  Route,
  Link
} from 'react-router-dom';

const ProductsList = () => {
  const [status, setStatus] = useState('idle');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3004/products?_page=1&_limit=2')
      .then(res => res.json())
      .then(
        (result) => {
          setProducts(result);
          setStatus("fetched")
        },
        (error) => {
          setStatus("error")
          setError(error);
        }
      )
  }, [])

  function setProductsSortedBy(filter, order) {
    fetch("http://localhost:3004/products?_sort=" + filter + "&_order=" + order)
      .then(res => res.json())
      .then(
        (result) => {
          setProducts(result);
          setStatus("fetched")
        },
        (error) => {
          setStatus("error")
          setError(error);
        }
      )
  }

  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    if (e.target.value === 'priceMax') {
      setProductsSortedBy('price', 'desc');
    } else if (e.target.value === 'priceMin') {
      setProductsSortedBy('price', 'asc');
    } else if (e.target.value === 'closest') {
      setProductsSortedBy('price', 'asc');
    }
  }

  return (
    <div>
      {status === 'error' && <div>{error}</div>}
      {status === 'fetching' && <div>loading</div>}
      {status === 'fetched' && (
        <>
          {typeof products === 'undefined' || products.length === 0 && <div> No products found! </div>}
          <div>ordenar por
            <select onChange={handleClick}>
              <option value="priceMin">menor precio</option>
              <option value="priceMax">mayor precio</option>
              <option value="closest">mas cercano</option>
            </select>
          </div>
          {products.map((product) => (
            <Link to={{ pathname: '/product/' + product.id }} style={{ textDecoration: 'none' }}>
              <div key={product.id} style={{ display: 'flex' }}>
                <div>
                  <img src={product.imgs} width='160' height='160' />
                </div>
                <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
                  <div>{product.title}</div>
                  <div>$ {product.price}</div>
                  <div>★ {product.score}</div>
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
