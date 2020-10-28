import React from 'react';
import './product-form.css';
import PropTypes from 'prop-types';

class ProductModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
      productName: '',
      description: '',
      group: '',
      subGroup: '',
      manufacturer: '',
      image: [],
      price: '',
      vat: '',
      uom: '',
      //arrays
      groups: [],
      subGroups: [],
      vats: [],
      manufacturers: [],
      uoms: [],
      showModal: false,
      code: ''
    };

    this.uoms = ['Szt', 'Opak', 'Zgrzewka'];
    this.manufacturers = ['GoldDrop', 'IKA', 'Gatta - rajstopy'];
    this.vats = [0, 5, 8, 23];
    this.groups = ['Plyny', 'Papier', 'Środki do czyszczenia'];
    this.subGroups = ['Wybierz podgrupę...'];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  static propTypes = {
    record: PropTypes.object.isRequired,
    };

  componentDidMount(){
    if(this.props.record != undefined){
      this.setState({ record: this.props.record });
      this.setState({ productName: this.props.record.name });
    }
    
  }
  showModalHandler = (event) => {
    this.setState({ showModal: true });
  };

  hideModalHandler = (event) => {
    this.setState({ showModal: false });
  };

  handleInputChange(event) {
    
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name);
  }

  handlePriceChange(event) {
    if (event.target.value <= 0) {
      alert('Cena musi być wyższa od 0! Wprowadz wartość ponownie.');
      this.setState({ price: '' });
    } else {
      this.setState({ price: event.target.value });
    }
  }

  handleGroupChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value === 'Plyny') {
      this.subGroups = ['Dezynfekujace', 'Czyszczące', 'Nabłyszczające'];
    } else if (event.target.value === 'Papier') {
      this.subGroups = ['Toaletowy', 'Do drukarek'];
    } else {
      this.subGroups = ['Mleczka', 'Udrażniające'];
    }
  }

  renderGroups() {
    return this.subGroups.map((subGroup) => (
      <option value={subGroup}> {subGroup} </option>
    ));
  }

  handleSubmit() {
    alert('Produkt poprawnie dodany do bazy.');
  }

  render() {
    return (
      <div className="main-form">
        <div className="product-form-items">
          <form className="product-form" onSubmit={this.handleSubmit} value="Submit">
            <label className="form-label" for="productName">
              Nazwa 
            </label>
            <input
              type="text"
              name="productName"
              className="form-obj"
              placeholder="Wpisz nazwę produktu..."
              value={this.state.productName}
              onChange={this.handleInputChange}
            ></input>
            <br></br>

            <label className="form-label" for="code">
              Kod 
            </label>
            <input
              type="text"
              name="code"
              className="form-obj"
              placeholder="Wpisz kod..."
              value={this.state.code}
              onChange={this.handleInputChange}
            ></input>
            <br></br>

            <label className="form-label" for="manufacturer">
              Producent
            </label>

            <select
              type="text"
              name="manufacturer"
              className="form-obj"
              placeholder="Wybierz producenta"
              value={this.state.manufacturer}
              onChange={this.handleGroupChange}
              onClick={this.showModalHandler}
            >
              {this.manufacturers.map((manufacturer) => (
                <option value={manufacturer}> {manufacturer} </option>
              ))}
            </select>
            <br></br>

            <label className="form-label" for="group">
              Grupa produktu
            </label>

            <select
              type="text"
              name="group"
              className="form-obj"
              placeholder="Wybierz grupę produktu"
              value={this.state.group}
              onChange={this.handleGroupChange}
            >
              {this.groups.map((group) => (
                <option value={group}> {group} </option>
              ))}
            </select>
            <br></br>

            <label className="form-label" for="subGroup">
              Podgrupa produktu
            </label>

            <select
              type="text"
              name="subGroup"
              className="form-obj"
              placeholder="Wybierz podgrupę produktu"
              value={this.state.subGroup}
              onChange={this.handleInputChange}
            >
              {this.renderGroups()}
            </select>
            <br></br>

            <label className="form-label" for="price">
              {' '}
              Cena netto{' '}
            </label>

            <input
              type="number"
              name="price"
              className="form-obj"
              placeholder="Dodaje cene"
              pattern="[0-9]{7}"
              value={this.state.price}
              onChange={this.handlePriceChange}
            ></input>
            <br></br>

            <label className="form-label" for="uom">
              Jednostka miary
            </label>
            <br></br>
            <select
              type="text"
              name="uom"
              className="form-obj-small"
              placeholder="Jednostka miary"
              value={this.state.uom}
              onChange={this.handleInputChange}
            >
              {this.uoms.map((uom) => (
                <option value={uom}> {uom} </option>
              ))}
            </select>
            <br></br>

            <label className="form-label" for="vat">
              Stawka VAT
            </label>
             <br></br>   
            <select
              type="text"
              name="vat"   
              className="form-obj-small"           
              placeholder="Wybierz stawke vat"
              value={this.state.vat}
              onChange={this.handleInputChange}
            >
              {this.vats.map((vat) => (
                <option value={vat}> {vat} </option>
              ))}
            </select> 
            <br></br>

            <button type="submit" className="modal-form-submit">
              Zapisz
            </button>
          </form>

          <div>
            <label className="form-label-tarea" for="description">
              Opis produktu
            </label>
            <textarea
              className="product-text-area"
              type="textarea"
              name="description"              
              placeholder="Opis produktu..."              
              value={this.state.description}
              onChange={this.handleInputChange}
            ></textarea>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductModalForm;
