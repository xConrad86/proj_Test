import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Checkbox extends Component {
  static propTypes = {
    objName: PropTypes.string.isRequired,
    handleFilter: PropTypes.func.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    filterItems: PropTypes.number.isRequired
  };

  state = {
    isChecked: false
  };

  UNSAFE_componentWillMount(){
     this.state.isChecked = this.props.isFiltered;
  }  
  
  toggleCheckboxChange = () => {
    const { handleFilter, objName, isFiltered } = this.props;   
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));    
    handleFilter(objName, !this.state.isChecked, true);
  };

  showQuantity = () => {
    let toShow = "";
    if(this.props.filterItems > 0){
      toShow = <span className="filter-checkbox-text"> ({this.props.filterItems}) </span>     
    }
    return toShow;
  }
  render() {
    const { objName, classes } = this.props;
    const  isChecked = this.state.isChecked;

    return (
      <div className="checkmark">        
          <input      
            key={objName}      
            className="checkbox"
            type="checkbox"              
            value={objName}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />          
          <span className="filter-checkbox-label">{objName}</span>    
          {
             this.showQuantity()
              
          }      
          
      </div>
    );
  }
}

export default Checkbox;
