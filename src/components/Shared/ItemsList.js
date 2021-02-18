import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import {
  Route,
  Link
} from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

const ItemsList = ({ items, itemsPerPage, page, totalItems, pageState,
  handleSortClick, handlePageClick, route, itemsSearchCriteria, ItemComponent }) => {
  return (
    <>
      {typeof items === 'undefined' || items.length === 0 && <div> No items found! </div>}
      <div>
        <select onChange={handleSortClick}>
          <option value="">Ordenar por</option>
          {itemsSearchCriteria.map((itemSearch) => (
            <option value={itemSearch.value}>{itemSearch.text}</option>
          ))}
        </select>
      </div>
      {ItemComponent}
      <Pagination count={Math.round(totalItems / itemsPerPage)} page={pageState} onChange={handlePageClick} />

    </>
  );
};

export default ItemsList;
