import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProducts } from '../../services/shelf/actions';

import Spinner from '../Spinner';
import ShelfHeader from './ShelfHeader';
import ProductList from './ProductList';
import './style.scss';
import GetSites from './Filter/QuantityFilter/QuantityChange';

class Shelf extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    filters: PropTypes.array.isRequired,
    sort: PropTypes.string,
    filterQuantity: PropTypes.number,
    productsList: PropTypes.array.isRequired,
  };

  state = {
    isLoading: false
  };

  componentDidMount() {
    this.handleFetchProducts();
  }

  componentWillReceiveProps(nextProps) {    
    const { filters: nextFilters, sort: nextSort, filterQuantity: nextFilterQuantity } = nextProps;
    //const { filters } = this.props.filters;
    console.log("NOWE FILTRY", nextProps, this.props)
    if (this.props.filters !== undefined  && nextFilters !== undefined &&  nextFilters.length !== this.props.filters.length) {
      this.handleFetchProducts(nextFilters, undefined);     
    }

    if (nextSort !== this.props.sort) {
      this.handleFetchProducts(undefined, nextSort);  
    }

    if (nextFilterQuantity !== this.props.filterQuantity) {
      this.handleFetchProducts(undefined, undefined, nextFilterQuantity);  
    }  
  }

  handleFetchProducts = (
    filters = this.props.filters,    
    sort = this.props.sort,
    filterQuantity = this.props.filterQuantity 
  ) => {
    console.log("handle fetch" + filters , this.props.filterQuantity, this.props.products.length);
    console.log("handle fetch",  this.props.filterQuantity);
    if(filterQuantity=== undefined){
      filterQuantity = 5
    }
    this.setState({ isLoading: true });
    this.props.fetchProducts(filters, sort, () => {
      this.setState({ isLoading: false });
    }, filterQuantity, 1);
  };

  render() {
    const { products } = this.props;
    const { productsList } = this.props;
    const { isLoading } = this.state;    
    console.log("pokazuje propsy", this.props)
    return (
      <React.Fragment>
        {isLoading && <Spinner />}
        <div className="shelf-container">
          
          <ShelfHeader productsLength={products.length}
                       productsListLength={productsList.length}/>
           <ProductList products={products} />         
          
          <GetSites products={products} 
                     filters={this.props.filters}
                     sort = {this.props.sort}
                     quantityToShow={this.props.filterQuantity}
                     productsListLength={productsList.length} />  
                     
        </div>        
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => (    
  {  
  products: state.shelf.products,  
  filters: state.filterObj.filters,    
  sort: state.sort.type,
  filterQuantity: state.filterQuantity.type,
  productsList: state.apiProducts.productsList  
}
);

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Shelf);

