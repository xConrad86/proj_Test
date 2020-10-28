import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../../../../services/shelf/actions';
import { updateFilterQuantity } from '../../../../services/filters/quantity/actions'
//import { propTypes } from 'react-bootstrap/esm/Image';
import './style.scss';

class QuantityFilter extends React.Component{
    constructor(props){
        super(props)

        this.state={
            initVal: 5,
        }   
        this.getFilter = this.getFilter.bind(this);
    }
    
   static propTypes = {
      filterQuantity: PropTypes.number,
      updateFilterQuantity: PropTypes.func.isRequired,     
      fetchProducts: PropTypes.func.isRequired,
      sort: PropTypes.string
   }
    
   componentDidMount(){
      if(this.props.filterQuantity===0){
         this.props.updateFilterQuantity(this.state.initVal);
      }      
   }
   handleFetchProducts = (
      filterQuantity,
      pageNo,
      filters = this.props.filters,    
      sort = this.props.sort      
    ) => {      
      this.props.updateFilterQuantity(filterQuantity);
      console.log("products quantity change",filterQuantity)
      this.setState({ isLoading: true });
      this.props.fetchProducts(filters, sort, () => {
        this.setState({ isLoading: false });
      }, filterQuantity, pageNo);
    };
    /* static PropTypes = {
                    //function
                    
            } */
        //onChange={e => handleOnChange(e.target.value)} className={classes}
     getFilter () { return <div className="quantity-filter">
         <span>
          Pokaż produkt:         
          </span>
          <select onChange={(event) => this.handleFetchProducts(event.target.value,1)}>
             <option value="5" key={1}>
                5
             </option>
             <option value="10" key={2}>
                10
             </option>
             <option value="15" key={3}>
                15
             </option>
          </select>                    
        </div>
     }

      render(){
        return(            
            <div>
            { this.getFilter() }
            </div>          
        );
      }
}


const mapStateToProps = state => ({   
   filterQuantity: state.filterQuantity.type,  
   products: state.shelf.products,  
   filters: state.filterObj.filters,
   sort: state.sort.type,         
 });
 
 export default connect(mapStateToProps,  {updateFilterQuantity, fetchProducts})(QuantityFilter);
