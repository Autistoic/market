import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";


const ProductDetail = () => {

  const { id } = useParams();

  const { status, data, error } = useFetch("http://localhost:3004/products/" + id);

  const product = data;

  return (
    <div>
      product detail
      <p> {product.title}</p>
      <p> {product.description}</p>
      <p> {product.price}</p>
    </div>
  );
};



export default ProductDetail;
