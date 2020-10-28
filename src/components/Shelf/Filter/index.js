import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateFilters, removeFilters, loadFilters, removeFilter} from '../../../services/filters/actions';
import { fetchProducts } from '../../../services/shelf/actions';
import Checkbox from '../../Checkbox';
import ButtonFilter from '../../ButtonFilter';
import ProducersDropdown from '../../DropDown/index';
import arrowFilter from './../../../images/noun_Arrow.svg'

import './style.scss';

//const availableSizes = ['Lakiery', 'Podłogi', 'Narzędzia', 'Farby', 'Okucia'];
//const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
const groups = ['Lakiery, farby, oleje', 'Kleje', 'Silikony', 'Bejce, patyny','Uszczelki drzwiowe', 'Narzędzia', 'Materiały ścierne', 
'Okleiny, obłogi, lamele', 'Obrzeża naturalne', 'Elementy złączne', 'Płyty', 'Okucia budowlane', 'Krzesła', 'Podłogi']
const units = ['szt','litr','kg', 'opak', 'm2', 'mb'];
const apply = ['Wewnętrzny', 'Zewnętrzny'];
const subGroups = ['Podkładowy', 'Utwardzacz', 'Nawierzchniowy'];

class Filter extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isGroup : false,
      isSubGroup : false,
      isPrice : false,
      isProducer : false,
      isPurpose : false,
      isUnit : false,
      priceFrom: 0,
      priceTo: 0,
      isApply: false,
    }
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.removeFilters = this.removeFilters.bind(this);    
    this.changeArrowPos = this.changeArrowPos.bind(this);
    this.getGroupQuantity = this.getGroupQuantity.bind(this);
    
  }
  static propTypes = {
    updateFilters: PropTypes.func.isRequired,  
    filters: PropTypes.array.isRequired,
 //   handleFilter: PropTypes.func.isRequired,
   // removeFilters: PropTypes.func.isRequired,
  //  removeFilter: PropTypes.func.isRequired,
    //loadFilters: PropTypes.func.isRequired,      
    fetchProducts: PropTypes.func.isRequired,    
 //   newFilter: PropTypes.array.isRequired,
    sort: PropTypes.string,
    priceFrom: PropTypes.number,
    filterQuantity: PropTypes.number,
    productsList: PropTypes.array.isRequired,
    productsListUF: PropTypes.array.isRequired,
  };
  
  componentDidMount(){
    console.log(this.state);
  }
  

  componentWillReceiveProps(nextProps) {
    console.log("nowe propsy");
    if (nextProps.newFilter !== this.props.newFilter) {
      //this.addFilter(nextProps.newFilter);
    }    
    if (nextProps.filterToRemove !== this.props.filterToRemove) {
      this.removeFilter(nextProps.filterToRemove);
    }
  }

  getGroupQuantity(group){        
    //where f[0] is a group for which we want to get sum    
    let filteredItems = 0;
    console.log("ilosc itemow do propsow", this.props.productsListUF, group)
    //const arrFiltered = this.props.productsListUF.filter(f => f.group.find(size => size === group ))
    const arrFiltered = this.props.productsListUF.filter(f => f.group === group )    

    if (!!arrFiltered){
      filteredItems = arrFiltered.length
    } 
    
    return filteredItems
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

  handleObjState = (name) => {   
    const objShow = !this.state[name]            
    this.setState({ [name]: objShow });   
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
    
    if(filterVal === false || filterVal === 0 ){
      const index = filters.findIndex(f => f[0] === objName);
      if (index >= 0) {
        filters.splice(index, 1);
        
      this.removeFilter(objName);}
    }     
    else {
      filters.push([objName, filterVal]);
    }  
    this.props.updateFilters(filters);        
    console.log("nowe filtry", filters)  
    if (doFetch){this.handleFetchProducts(); }
  }
  //objName, filterVal
  handlePriceChange (event) {            
    if( event.target.value !== 0 ){
      this.setState({ [event.target.name]: event.target.value });    
    }        
  }

  addPriceToFilters = () => {
    this.removeFilter("priceFrom");
    this.removeFilter("priceTo");
    this.handleFilter("priceFrom", this.state.priceFrom, false);
    this.handleFilter("priceTo", this.state.priceTo, true);
  }


  removeFilters(){    
    const { filters} = this.props;    
    filters.length = 0;
    //to check
    removeFilters(filters);        
    this.props.updateFilters(filters);  
    this.handleFetchProducts();
    //closing respective sections
    this.setState({
      isPrice: false, isGroup: false, isProducer: false, isUnit: false, isApply: false
    }) 

  }
  
  createCheckbox = label => {
    const isFiltered = Array.isArray(this.props.filters.find(
      filt => filt[0] === label
    ))
    console.log("chekboxy", isFiltered)
    return   <Checkbox
          classes="filters-available-size"
          objName={label}
          handleFilter={this.handleFilter}
          key={label}
          isFiltered={isFiltered }      
          filterItems={this.getGroupQuantity(label)}
    />
  };
  
  createBtnFilter = label => {
    const isFiltered = Array.isArray(this.props.filters.find(
      filt => filt[0] === label
    ))
    
    return   <ButtonFilter          
          objName={label}
          handleFilter={this.handleFilter}
          key={label}
          isFiltered={isFiltered }                
    />
  };

  getPriceVal = (objName) => {
    const { filters} = this.props;    
    var price = 0.00;      
    var priceFil = filters.find((f) => f[0] === objName);
    if (priceFil !== undefined) {
        price = parseFloat(priceFil[1]);      
        console.log('szukam cen', price);      
    } 
    return price;
  }
  
  createCheckboxes = () => groups.map(this.createCheckbox);
  createBtns = () => units.map(this.createBtnFilter);
  createSubCheckboxes = () => subGroups.map(this.createCheckbox);
  createApplyCheckboxes = () => apply.map(this.createCheckbox);
  
  //changing classname for images due to arrow position
  changeArrowPos(objFilterName){
      return this.state[objFilterName] === false ? 
      <img
        className="filter-arrow-down"  
        onClick={() => this.handleObjState(objFilterName)}
        src={arrowFilter}/> : 
      <img
        className="filter-arrow-up"  
        onClick={() => this.handleObjState(objFilterName)}
        src={arrowFilter}/>
  }

 render(){   
  return (
    <div className="filters">
      <h4 className="title">Filtry:</h4>   
      <button
       className="filter-button"  
      onClick={() => this.removeFilters()}
      >
        Wyczysc filtry
      </button> 
      <div>
        <div className="filter-div">
          <button           
          className="filter-btn"          
          onClick={() => this.handleObjState("isGroup")}>
            Rodzaj produktu
          </button>          
          
           { this.changeArrowPos("isGroup") }
          {this.state.isGroup && <div className="filter-div-items">{this.createCheckboxes()}</div>}
        </div>
        <div className="filter-div-price">
          <button className="filter-btn"
          name="isPrice"
            onClick={() => this.handleObjState("isPrice")}>
            Cena                        
          </button>   
          { this.changeArrowPos("isPrice") }
          { this.state.isPrice &&
          <div className="filter-div-price-btns">                
            <div>
              Cena od
              <input 
              defaultValue={this.getPriceVal('priceFrom')}
              name="priceFrom" type="number" min="0.00" max="25000.00" step="50.0" onChange={this.handlePriceChange}/>          
            </div> 
            <div>
              Cena do
              <input 
              defaultValue={this.getPriceVal('priceTo')}
              name="priceTo" type="number" min="0.00" max="25000.00" step="50.0" onChange={this.handlePriceChange} />          
            </div>
            <button 
              className="filter-button" 
              onClick={this.addPriceToFilters}>
              Zastosuj
            </button>
            </div>
          }          
        </div>
        <div className="filter-div">
          <button           
          className="filter-btn"          
          onClick={() => this.handleObjState("isProducer")}>
            Producent
          </button>  
          { this.changeArrowPos("isProducer") }
          {this.state.isProducer && 
            <div className="filter-producer-dd">
          {<ProducersDropdown handleFilter={this.handleFilter}
            filters={this.props.filters}
          
          />}
          </div> }
        </div>        
        <div className="filter-div">
          <button           
          className="filter-btn"          
          onClick={() => this.handleObjState("isUnit")}>
            Pojemność
          </button>          
          { this.changeArrowPos("isUnit") }
          {this.state.isUnit && <div className="filter-div-items">{this.createBtns()}</div>}
        </div>    

        <div className="filter-div">
          <button           
          className="filter-btn"          
          onClick={() => this.handleObjState("isApply")}>
            Zastosowanie
          </button>          
          { this.changeArrowPos("isApply") }
          {this.state.isApply && <div className="filter-div-items">{this.createApplyCheckboxes()}</div>}
        </div>    
  {/*       
        <div className="filter-div">
          <button           
          className="filter-btn"          
          onClick={() => this.handleObjState("isSubGroup")}>
            Podgrupa produktu
          </button>          
          { this.changeArrowPos("isSubGroup") }
          {this.state.isSubGroup && <div className="filter-div-items">{this.createSubCheckboxes()}</div>}
        </div>    */} 
          
      </div>
    </div>
  );
} 
 
};

const mapStateToProps = state => ({  
  newFilter: state.filterObj.filterToAdd,   
  filterToRemove: state.filterObj.filterToRemove,
  sort: state.sort.type,  
  products: state.shelf.products,  
  filters: state.filterObj.filters,
  filterQuantity: state.filterQuantity.type,
  productsList: state.apiProducts.productsList,       
  productsListUF: state.apiProductsUF.productsListUF
});

export default connect(mapStateToProps,  {updateFilters, removeFilter, fetchProducts }  )(Filter);
