//import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';





const App = () => {
  

  return (
    <Router>
      <div className='Content'>
        <Routes>
        {/*<Route path="/home" element={<Home2 />} />*/}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/*<Route path="/tracker" element={<UTable />} />
        <Route path="/requests" element={<ATable />} />
        <Route path="/signup" element={<ReactSignup />} />*/}
        </Routes>
      </div>

      
    
      
    </Router>
  );
}

export default App;
