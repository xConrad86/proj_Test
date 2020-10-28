import React from 'react'
//import Multiselect from 'react-widgets/lib/Multiselect'
import { Multiselect } from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import './style.scss';

let producers = [
  'Hesse Lignal',
   'Sivam',
   'Sikkens',
   'Alcea', 
   'Libra', 
   'Lakma', 
   'Sopur', 
   'Deventer',
   'AiB', 
   'Schlegel',
   'Ottensten',
   '3M', 
   'Kuper', 
   'CMT', 
   'Kovax', 
   'SIA', 
   'Indasa', 
   'Wkręt-met',
   'Gerda', 
   'Simonswerk', 
   'Koblenz', 
   'Otlav', 
  ]

class ProducersDropdown extends React.Component {
    constructor(props) {
      super(props)
      this.state = { selectedValues: [] }     

      this.onSelect = this.onSelect.bind(this);
      this.onRemove = this.onRemove.bind(this);
    }
    
    static propTypes = {
      objName: PropTypes.string.isRequired,
      handleFilter: PropTypes.func.isRequired,
      filters: PropTypes.array
    };


    UNSAFE_componentWillMount(){
      var filters = [];
      if(this.props.filters !== undefined){
        for(let i = 0; i < this.props.filters.length; i++ ){
          if(this.props.filters[i][1] === "producer"){
             filters.push(this.props.filters[i][0])
          }
           
       }      
       console.log("filtry producenci", this.props.filters);
       this.setState({ selectedValues: filters });   

      }
      
   }  

  handleChange = (objName, show) => {
      const { handleFilter} = this.props;         
      handleFilter(objName, show, true);
  };

  onSelect(selectedList, selectedItem) {    
      console.log("wybralem producenta", selectedItem);
      this.setState({ selectedValues: selectedList });    
      this.handleChange(selectedItem,"producer")
    }  
  
  onRemove(selectedList, removedItem) {    
      this.setState({ selectedValues: selectedList });
      this.handleChange(removedItem,false)
    }
  

    render() {
      return (        
        <Multiselect                   
          options={producers}
        //data={producers}
          placeholder="Wybierz..."  
          isObject={false}                    
          selectedValues={this.state.selectedValues} // Preselected value to persist in dropdown
          onSelect={this.onSelect} // Function will trigger on select event
          onRemove={this.onRemove} // Function will trigger on remove event                    
          isObject={false}          
          avoidHighlightFirstOption={true}
          style={{ chips: { background: "black" } }}
          selectionLimit={5}
        />        
      )
    }
  }
  

export default ProducersDropdown;