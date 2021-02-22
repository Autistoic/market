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
  const productDetailsResponse = useFetch("http://localhost:3004/products_details?product_id=" + id);
  const product = productsResponse.data;
  const productDetails = productDetailsResponse;
  const [input, setInput] = useState(''); // '' is the initial state value

  const saveQuestion = e => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "user_id": 1,
        "text": input,
        "product_id": id
      })
    };
    fetch('http://localhost:3004/questions/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data.id));

  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <h2>Preguntas</h2>
      <div>
        <QuestionsList searchBy={'product_id'} id={id}></QuestionsList>
      </div>
      <h3>Nueva pregunta</h3>
      <textarea value={input} onInput={e => setInput(e.target.value)}/>
      <button onClick={saveQuestion}>Enviar pregunta</button>
    </>
  );
};

export default ProductDetail;
