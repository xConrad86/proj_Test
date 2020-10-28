import React from 'react';
import PropTypes from 'prop-types';
import QuantityFilter from '../Filter/QuantityFilter/index';
import NameFilter from '../Filter/NameFilter/index';
import Sort from '../Sort';
//----Header for products view----
const ShelfHeader = props => {
  return (
    <div className="shelf-container-header">
      <small className="products-found">
        <span> {props.productsLength} produktów </span>
        <span> ({props.productsListLength})  </span>
      </small>
      <Sort/>      
      <QuantityFilter/>
      <NameFilter/>
      
    </div>
  );
};

ShelfHeader.propTypes = {
  productsLength: PropTypes.number.isRequired
};

export default ShelfHeader;
