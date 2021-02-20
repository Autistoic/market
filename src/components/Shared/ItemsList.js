import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import {
  Route,
  Link
} from 'react-router-dom';

const ItemsList = ({ ItemComponent, items, route }) => {
  return (
    <>
      {typeof items === 'undefined' || items.length === 0 && <div> No items found! </div>}
      {items.map((item) => (
        React.cloneElement(ItemComponent, { item: item, route: route })
      ))}
    </>
  );
};

export default ItemsList;
