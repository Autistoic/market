import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import {
  Route,
  Link
} from "react-router-dom";

const ProductListItem = ({items, route}) => {

  return (
    <>
       {items.map((item) => (
        <Link to={{ pathname: '/' + route + '/' + item.id }} style={{ textDecoration: 'none' }}>
          <div key={item.id} style={{ display: 'flex' }}>
            <div>
              <img src={item.imgs} width='160' height='160' />
            </div>
            <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
              <div>{item.title}</div>
              <div>$ {item.price}</div>
              <div>★ {item.score}</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};



export default ProductListItem;
