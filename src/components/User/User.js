import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Link
} from "react-router-dom";
//const { status, data, error } = useFetch("http://localhost:3004/user/" + id);


const User = () => {

  const [user, setUser] = useState({});
  useEffect(() => {
    fetch('http://localhost:3004/user')
      .then(res => res.json())
      .then(
        (result) => {
          setUser(result)
        },
        (error) => {
        }
      )
  }, [])

  return (
    <div>
      User Component {user.name}
      <div>
        <Link to={{ pathname: '/useredit/' }}>
          Editar datos
        </Link>
      </div>
      <div>
        <Link to={{ pathname: '/purchases/' }}>
          Compras
        </Link>
      </div>
      <div>
        <Link to={{ pathname: '/sales/' }}>
          Ventas
        </Link>
      </div>
      <div>
        <Link to={{ pathname: '/userQuestions/' }} >
          Preguntas
        </Link>
      </div>
      <div>
        <Link to={{ pathname: '/favs/' }}>
          Favoritos
        </Link>
      </div>
      <div>
        <Link to={{ pathname: '/product/' }}>
          Publicar nuevo producto
        </Link>
      </div>
    </div>
  )
}

User.propTypes = {};

User.defaultProps = {};

export default User;
