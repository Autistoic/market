import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Link
} from "react-router-dom";


//const { status, data, error } = useFetch("http://localhost:3004/user/" + id);


const UserPreview = ({user}) => (
  <div>
    Hello {user.user_name}!
  </div>
);

UserPreview.propTypes = {};

UserPreview.defaultProps = {};

export default UserPreview;
