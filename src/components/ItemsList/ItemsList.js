import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';


const ItemsList = () => {

  const { status, data, error } = useFetch("http://localhost:3004/items");

  const items = data;

  return (
    <div>      
      {status === 'error' && <div>{error}</div>}
      {status === 'fetching' && <div>loading</div>}
      {status === 'fetched' && (
        <>
          {typeof items === 'undefined' || items.length === 0 && <div> No items found! </div>}

          {items.map((item) => (
            <div key={item.id}>
              {item.title}{item.id}
            </div>
          ))}
        </>
      )}
    </div>
  );
};



export default ItemsList;
