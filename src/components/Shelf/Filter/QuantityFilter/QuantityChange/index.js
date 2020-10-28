import React from 'react'
import PropTypes from 'prop-types';
import { fetchProducts } from '../../../../../services/shelf/actions';
import { connect } from 'react-redux';
import './style.scss';


class GetSites extends React.Component{
   constructor(props){
      super(props);

      this.getQuantity = this.getQuantity.bind(this);    
      this.handleFetchProducts = this.handleFetchProducts.bind(this);
      this.createSiteBtns = this.createSiteBtns.bind(this);
   }

   static propTypes = {
      products: PropTypes.array.isRequired, 
      filters: PropTypes.array.isRequired, 
      quantityToShow: PropTypes.number.isRequired,      
      fetchProducts: PropTypes.func.isRequired,   
      sort: PropTypes.string,
      productsListLength: PropTypes.number,
      handleFetchProducts: PropTypes.func,
      getQuantity: PropTypes.func,
      createSiteBtns: PropTypes.func
   }

    getQuantity = (productsListLength, quantityToShow)  => {
      if (productsListLength > 0){
         return productsListLength / quantityToShow
      }
   }

    handleFetchProducts = (
      pageNo,
      filterQuantity,   
      filters,    
      sort 
    ) => {              
   //   this.setState({ isLoading: true });
      this.props.fetchProducts(filters, sort, () => {
     //   this.setState({ isLoading: false });
      }, filterQuantity, pageNo);
    };

   createSiteBtns = () => {
      let x = this.getQuantity(this.props.productsListLength, this.props.quantityToShow);       
      let items = [];
      x = Math.ceil(x);
      
      if (x >= 2){         
         items.push ( <span>   Pokaż stronę </span>)
         for (var i = 1; i <= x; i++) {
           items.push(  <button
                        className="quantity-filter-sites-button"  
                        key={i}
                        value={i}
                        onClick={(event) => this.handleFetchProducts(event.target.value, this.props.quantityToShow, 
                                                                this.props.filters, this.props.sort  )}>
               {i}
            </button>)
          }
      } 
   
      return items;
   }

   render(){
      return (
         <div className="quantity-filter-sites">                    
            {  this.createSiteBtns()  }               
         </div>
      )  

   }
   

}

const mapStateToProps = state => ({   
   filterQuantity: state.filterQuantity.type,  
   products: state.shelf.products,  
   filters: state.filterObj.filters,
   sort: state.sort.type,         
 });
 
 export default connect(mapStateToProps,  { fetchProducts})(GetSites);
