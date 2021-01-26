import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";


const ProductDetail = () => {

  const { id } = useParams();

  const { status, data, error } = useFetch("http://localhost:3004/products/" + id);

  const productTypesResponse = useFetch("http://localhost:3004/productTypes/");
  const productTypes = productTypesResponse.data;

  const product = data;

  const [formData, setForm] = useState({userID: 1});

  const onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setForm({
        ...formData,
        [nam]: val
    })
  }

  const saveProduct = e => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://localhost:3004/products/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data.id));

  }

  return (
    <form>
      agregar un nuevo producto
      <div>
        <label for="title">Nombre</label>
        <input name="title" type="text" value={product.title} onChange={onChangeHandler} />
      </div>
      <div>
        <label for="description">Descripcion</label>
        <textarea name="description" type="text" value={product.description} onChange={onChangeHandler}/>
      </div>
      <div>
        <label for="price">Precio</label>
        <input name="price" type="text" value={product.price}  onChange={onChangeHandler}/>
      </div>
      <div>
        <label for="type">Tipo</label>
        <select name="productTypeID" onChange={onChangeHandler}>
            {productTypes.map((option) => (
              <option value={option.id}>{option.name}</option>
            ))}
          </select>
      </div>
      <button onClick={saveProduct}>GUardar</button>
    </form>
  );
};



export default ProductDetail;
