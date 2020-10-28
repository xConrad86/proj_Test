import React from "react";
import "./product-form.css";
import Table from 'react-bootstrap/Table';
import ProductModal from "./product-modal";
import Forms from "./product-modal";
//https://github.com/reactjs/react-modal/blob/master/examples/basic/forms/index.js

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      showModal : false
    };
  }

  render() {        
    return (
      <div>
        <div>
            <Forms/>
        </div>             
      </div>
    );
  }
}

export default AdminPanel;
