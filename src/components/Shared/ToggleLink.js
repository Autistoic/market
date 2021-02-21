import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import {
    Route,
    Link
} from "react-router-dom";

const ToggleLink = ({ item, route }) => {
    const link = (route) ? '/' + route + '/' + item.product_id : '';

    if (link !== '') {
        return <TLink link={link} item={item} />;
    }
    return (
        <div>
            <span>{item.text}</span>
        </div>
    );

};

const TLink = ({ item, link }) => {
    return (
        <Link to={{ pathname: link }} style={{ textDecoration: 'none' }}>
            <div key={item.id} style={{ display: 'flex' }}>
                <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
                    <div>{item.text}</div>
                </div>
            </div>
        </Link>)
};
export default ToggleLink;
