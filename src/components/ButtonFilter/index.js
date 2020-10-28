import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class ButtonFilter extends Component {
  constructor(props){
    super(props);

    this.state = {
      isChecked: false,
     
    }
    this.getClassName = this.getClassName.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
        
  }
  static propTypes = {
    objName: PropTypes.string.isRequired,
    handleFilter: PropTypes.func.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    filterItems: PropTypes.number.isRequired,
    getClassName: PropTypes.func.isRequired
  };

  UNSAFE_componentWillMount(){
     this.state.isChecked = this.props.isFiltered;    
  }  
  
  toggleCheckboxChange (){
    const { handleFilter, objName, isFiltered } = this.props;   
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));    
   
    handleFilter(objName, !this.state.isChecked, true);

  };

  getClassName (objName){
    
    return (
      <button 
        key={objName}
        className={ this.state.isChecked ? "filter-button-unit-checked" : "filter-button-unit"}
        onClick={this.toggleCheckboxChange}>
      {objName}
    </button>
    )
    
  };


  render() {
    const {objName} = this.props;    
    return (
      this.getClassName(objName)            
    );
  }
}

export default ButtonFilter;
