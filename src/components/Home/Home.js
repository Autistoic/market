import React, { useState, useEffect } from 'react';
import ProductsList from '../Products/ProductsList';
import UserPreview from '../User/UserPreview';



const Home = () => {
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
    <div style={{ 'display': 'flex', 'flex-direction': 'row' }}>
      <div>
        <UserPreview user={user}></UserPreview>
      </div>
      <ProductsList></ProductsList>
    </div>)
}

Home.defaultProps = {};

export default Home;
