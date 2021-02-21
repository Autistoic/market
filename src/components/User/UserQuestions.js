import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import QuestionsList from '../Shared/QuestionsList';
import { useUserContext } from '../../App'

const UserQuestions = () => {
    const user = useUserContext();
    return (<>
        <QuestionsList searchBy={'user_id'} id={user.id} route={'product'}></QuestionsList>
    </>
    )
};

UserQuestions.propTypes = {};

UserQuestions.defaultProps = {};

export default UserQuestions;
