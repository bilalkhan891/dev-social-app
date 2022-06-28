import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import Landing from "./components/layout/Landing"
import NavBar from "./components/layout/NavBar"
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Redux 
import { Provider } from 'react-redux'
import store from "./store"


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
