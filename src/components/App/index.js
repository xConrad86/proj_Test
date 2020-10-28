import React from 'react';
import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import {NavLink, BrowserRouter} from 'react-router-dom';
import Router from './../../Router';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => 
<div>
  <nav> 
    <ul>
      <li>
        <NavLink to="/Shop">Shop</NavLink>  
      </li>
      <li>
        <NavLink to="/Ship">Przesyłki</NavLink>
      </li>    
      <li>
        <NavLink to="/Admin">Panel Admina</NavLink>
      </li>    
    </ul>
  </nav>
</div>
const App = () => (
  
  <BrowserRouter>    
    
    <React.Fragment>   
      <Navigation />
      <Router />
    </React.Fragment>
  </BrowserRouter>
);

export default App;
