import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetail from "./components/Products/ProductDetail";
import ProductEdit from "./components/Products/ProductEdit";
import User from "./components/User/User";
import UserQuestions from "./components/User/UserQuestions";
import MainMenu from './components/Shared/MainMenu';


const UserContext = React.createContext();

export default function App() {

  const [user, setUser] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    fetch('http://localhost:3004/user')
      .then(res => res.json())
      .then(
        (result) => {
          setUser(result)
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
            <UserContext.Provider value={user}>
              <Router>
                <div>
                    <MainMenu></MainMenu>
                    {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                  <Switch>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/profile">
                      <User />
                    </Route>
                    <Route path="/product/:id">
                      <ProductDetail />
                    </Route>
                    <Route path="/publicar">
                      <ProductEdit />
                    </Route>
                    <Route path="/userQuestions">
                      <UserQuestions />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </Router>
            </UserContext.Provider>
          </>)
      }
    </>
  );
}

export function useUserContext() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function About() {
  return <h2>About</h2>;
}

