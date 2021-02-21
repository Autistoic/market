import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ItemsList from './ItemsList'
import QuestionListItem from '../Questions/QuestionListItem';

const QuestionsList = ({ searchBy, id, route }) => {

    const [questions, setQuestions] = useState({});
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        fetch('http://localhost:3004/questions?' + searchBy + '=' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setQuestions(result)
                    setStatus('fetched')
                },
                (error) => {
                }
            )
    }, [])
    return (
        <>
            {
                status === 'fetched' && (
                    <ItemsList ItemComponent={<QuestionListItem />} items={questions} route={route} />
                )
            }
        </>
    )
};

QuestionsList.propTypes = {};

QuestionsList.defaultProps = {};

export default QuestionsList;
