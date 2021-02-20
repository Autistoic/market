import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import ItemsList from '../Shared/ItemsList'
import QuestionListItem from '../Questions/QuestionListItem';


const Questions = (props) => {

  const [userQuestions, setUserQuestions] = useState({});
  const [status, setStatus] = useState('idle');
  let location = useLocation();
  const userId = location.state.id;

  useEffect(() => {
    fetch('http://localhost:3004/questions?user_id=' + userId)
      .then(res => res.json())
      .then(
        (result) => {
          setUserQuestions(result)
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
          <>
            < div >
              Questions Component
        <ItemsList ItemComponent={<QuestionListItem />} items={userQuestions} route={'product'} />
            </div >
          </>)
      }
    </>
  )
};

Questions.propTypes = {};

Questions.defaultProps = {};

export default Questions;
