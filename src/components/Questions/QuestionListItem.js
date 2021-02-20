import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import {
  Route,
  Link
} from "react-router-dom";

const QuestionListItem = ({item, route}) => {
  return (
    <>
        <Link to={{ pathname: '/' + route + '/' + item.product_id }} style={{ textDecoration: 'none' }}>
          <div key={item.id} style={{ display: 'flex' }}>
            <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
              <div>{item.text}</div>
            </div>
          </div>
        </Link>
    </>
  );
};
export default QuestionListItem;
