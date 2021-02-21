import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import {
    Route,
    Link
} from "react-router-dom";
import ToggleLink from '../Shared/ToggleLink';

const QuestionListItem = ({ item, route }) => {
    const link = (route) ? '/' + route + '/' + item.product_id : '';
    return (
        <ToggleLink item={item} route={route} />
    );
};
export default QuestionListItem;