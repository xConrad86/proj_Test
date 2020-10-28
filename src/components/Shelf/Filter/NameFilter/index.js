import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../../../../services/shelf/actions';
import { updateFilters, removeFilters, loadFilters, removeFilter} from '../../../../services/filters/actions';
//import { propTypes } from 'react-bootstrap/esm/Image';
import './style.scss';

class NameFilter extends React.Component{
    constructor(props){
        super(props)

        this.state={
            dimension: 'productSearchName',
        }   
        this.getFilter = this.getFilter.bind(this);
        this.getDimVal = this.getDimVal.bind(this);
    }
    
    static propTypes = {
      updateFilters: PropTypes.func.isRequired,  
      filters: PropTypes.array.isRequired,       
      fetchProducts: PropTypes.func.isRequired,       
      sort: PropTypes.string,
      filterQuantity: PropTypes.number,      
    };
    
    componentWillReceiveProps(nextProps) {
      console.log("nowe propsy");
      if (nextProps.newFilter !== this.props.newFilter) {
        //this.addFilter(nextProps.newFilter);
      }    
      if (nextProps.filterToRemove !== this.props.filterToRemove) {
        this.removeFilter(nextProps.filterToRemove);
      }
    }

    removeFilter = objName => {
      const { filters, updateFilters } = this.props;
      const index = filters.findIndex(f => f[0] === objName);
      if (index >= 0) {
        filters.splice(index, 1);
        updateFilters(filters);
      }      
    };

    handleFilter = (objName, filterVal, doFetch) => {
      const { filters} = this.props;            
      const index = filters.findIndex(f => f[0].includes("productSearch"));
      if (index >= 0) {
          filters.splice(index, 1);          
          this.removeFilter(objName);
      }     
      
      filters.push([objName, filterVal]);  
      this.props.updateFilters(filters);                
      if (doFetch){this.handleFetchProducts(); }
    }
     
    handleFetchProducts = (
      filters = this.props.filters,    
      sort = this.props.sort,
      filterQuantity = this.props.filterQuantity
    ) => {
      console.log("handle fetch" , filters);
      console.log("handle fetch" , filterQuantity);
      this.setState({ isLoading: true });
      this.props.fetchProducts(filters, sort, () => {
        this.setState({ isLoading: false });
      },filterQuantity,1);
    };
    /* static PropTypes = {
                    //function
                    
            } */
        //onChange={e => handleOnChange(e.target.value)} className={classes}
     getFilter (dimVal) { return <div className="quantity-filter">
           <select onChange={(event) => this.setState({dimension:event.target.value})}>
             <option value="productSearchName" key={1}>
                Nazwa produktu
             </option>
             <option value="productSearchCode" key={2}>
                Kod produktu
             </option>             
          </select>  
          <input 
            type="text"
            name="nameFilter"
            value={dimVal}
            onChange={(event) => this.handleFilter(this.state.dimension,event.target.value, true)}/>
                              
        </div>
     }

     getDimVal(){
      var myVal = '';
      var productSearch = this.props.filters.find((f) => f[0].includes('productSearchName'));     
      if (productSearch !== undefined){
        myVal = productSearch[1]        
      }
      return myVal
     }

      render(){
        var dimVal = this.getDimVal();
        return(    
           
            <div>
            { this.getFilter(dimVal) }
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
 
 export default connect(mapStateToProps,  {updateFilters, removeFilter, fetchProducts})(NameFilter);
