import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Root from './Root';
import './index.scss';
//need to be added, without this reference some functionalities for various objects will not work 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


ReactDOM.render(
  
  <Root>        
    <App />
  </Root>,
  document.getElementById('root')
);
