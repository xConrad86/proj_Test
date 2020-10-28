import React from 'react';
import InpostShipp from './companies/inpost.js';
import './style.scss';
import { withRouter } from 'react-router';


function ShippingNavigator() {
  return (
    <div className="shipping">
      <InpostShipp />
      <div className="col-12 col-md-6 example-col">
        
    </div>
    </div>
  );
}

export default ShippingNavigator;
