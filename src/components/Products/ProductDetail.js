import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import {
  Route,
  Link
} from "react-router-dom";

const ProductDetail = () => {

  const { id } = useParams();
  const productsResponse = useFetch("http://localhost:3004/products/" + id);
  const commentsResponse = useFetch("http://localhost:3004/comments?productId/" + id);
  const product = productsResponse.data;
  const comments = commentsResponse;

  return (
    <>
      <h1>{product.title}</h1>

      <p>{product.description}</p>
      <p>{product.price}</p>

      <h2>Comentarios</h2>
      <div>
        {comments.status === 'error' && <div>{comments.error}</div>}
        {comments.status === 'fetching' && <div>loading</div>}
        {comments.status === 'fetched' && (
          <>
            {typeof comments === 'undefined' || comments.length === 0 && <div> No products found! </div>}
            {comments.data[0].comments.map((product) => (
              <div key={product.id}>
                {product.value}{product.id}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};



export default ProductDetail;
