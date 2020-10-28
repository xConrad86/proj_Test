import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateSort } from '../../../services/sort/actions';
import Selectbox from '../../Selectbox';


const sortBy = [
  { value: '', label: 'Wybierz' },
  { value: 'lowestprice', label: 'Rosnąco' },
  { value: 'highestprice', label: 'Malejąco' }
  //{ value: 'productAsc', label: 'Nazwa produktu asc' }
  //{ value: 'productDesc', label: 'Nazwa produktu desc' }
];

const Sort = ({ updateSort, sort }) => (
  <div className="sort">
    Sortuj:
    <Selectbox options={sortBy} handleOnChange={value => updateSort(value)} />
  </div>
);

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  sort: state.sort.type
});

export default connect(
  mapStateToProps,
  { updateSort }
)(Sort);
