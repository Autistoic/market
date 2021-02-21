import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import {
  Route,
  Link
} from "react-router-dom";
import QuestionsList from '../Shared/QuestionsList';

const ProductDetail = () => {

  const { id } = useParams();
  const productsResponse = useFetch("http://localhost:3004/products/" + id);
  const questionsResponse = useFetch("http://localhost:3004/questions?product_id=" + id);
  const productDetailsResponse = useFetch("http://localhost:3004/products_details?product_id=" + id);
  const product = productsResponse.data;
  const questions = questionsResponse;
  const productDetails = productDetailsResponse;

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <h2>Preguntas</h2>
      <div>
        <QuestionsList searchBy={'product_id'} id={id}></QuestionsList>
      </div>
    </>
  );
};

export default ProductDetail;
