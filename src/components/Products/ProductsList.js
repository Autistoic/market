import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import {
  Route,
  Link
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Pagination } from '@material-ui/lab';

const ProductsList = () => {
  const [status, setStatus] = useState('idle');
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(1);  
  const [error, setError] = useState(null);
  const [pageState, setPageState] = useState(1);
  let page = 1;
  const itemsPerPage = 2;
  
  const [sortedBy, setsortedBy] = useState('');

  useEffect(() => {
    fetch('http://localhost:3004/products?_page=1&_limit=' + itemsPerPage)
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
      );

    fetch('http://localhost:3004/total_products')
      .then(res => res.json())
      .then(
        (result) => {
          setTotalProducts(result.value);
         // setStatus("fetched")
        },
        (error) => {
          // setStatus("error")
          // setError(error);
        }
      );

  }, [])


  function setProductsSortedBy(filter, order) {
    const sortedBy = '&_sort=' + filter + '&_order=' + order
    setsortedBy(sortedBy);
    fetch('http://localhost:3004/products?_page=1&_limit=' + itemsPerPage + sortedBy)
      .then(res => res.json())
      .then(
        (result) => {
          setProducts(result);
          setPageState(1);
          setStatus("fetched")
        },
        (error) => {
          setStatus("error")
          setError(error);
        }
      )
  }

  function loadNextPage() {
    
    fetch('http://localhost:3004/products?_page=' + page + '&_limit=' + itemsPerPage + sortedBy)
      .then(res => res.json())
      .then(
        (result) => {
          setProducts([...result]);
          setStatus("fetched")
        },
        (error) => {
          setStatus("error")
          setError(error);
        }
      )
  }

  function handlePageClick(event, value) {
    page = value;
    setPageState(value);
    loadNextPage()
  };

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
          <div>
            <select onChange={handleClick}>
              <option value="">Ordenar por</option>
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
      <Pagination count={Math.round(totalProducts / itemsPerPage)} page={pageState} onChange={handlePageClick} />
      <div>
        <Link to={{ pathname: '/publicar/' }}>
          <Button variant="contained" color="primary">Agregar producto</Button>

        </Link>
      </div>
    </div>
  );
};

export default ProductsList;
