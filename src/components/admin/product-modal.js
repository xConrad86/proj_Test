import React, { Component } from 'react';
import ProductModalForm from './product-modal-form';
import Modal from 'react-modal';
import CustomCell from './products-grid';
import './product-modal.css';
import { objectOf } from 'prop-types';


const MODAL_A = 'modal_a';
const MODAL_B = 'modal_b';

const DEFAULT_TITLE = 'Default title';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = { 
         isOpen: false,
         record: []
     };
  }

  toggleModal = (record, event) => {    
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen,
        record: record
     });
     console.log("moj rekord" , record)
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <button className="modal-form-btn-add" onClick={this.toggleModal}>Dodaj produkt</button>                
        <Modal
          id="modal_with_forms"
          isOpen={isOpen}
          closeTimeoutMS={150}
          contentLabel="modalA"
          shouldCloseOnOverlayClick={true}          
          onRequestClose={this.toggleModal}                 
          ariaHideApp={false}
          className ="modal-form"
          aria={{
            labelledby: "heading",
            describedby: "fulldescription"                        
          }}>
          <div className="modal-form-top-sec">
            <div className="modal-form-close-sec">
              <button className="modal-form-close-sec-btn" onClick={() => this.setState({ isOpen: false })}>
                Zamknij
              </button>
            </div>
            <div className = "modal-form-title">
              <h1  id="heading">Dodaj produkt</h1>
              <p>Wypełnij pola aby dodać produkt</p>  
            </div>  
          </div>
          <div id="fulldescription" tabIndex="0" role="document">            
            
            <ProductModalForm record={ Object.assign({},this.state.record)}/>
          </div>
        </Modal>
        <div className="products-list">
            <CustomCell toggleModal={this.toggleModal} />
        </div>           

      </div>
    );
  }
}

export default Forms;