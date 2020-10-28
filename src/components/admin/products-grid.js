import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from 'prop-types';
//import records from 'data.json';
//https://github.com/ashvin27/react-datatable

   const products = [
      {
        "id": 12,
        "name": "Cat Tee Black T-Shirt",
        "producer": "xx",        
        "description": "4 MSL",
        "availableSizes": ["Lakiery", "Podlogi"],
        "code": "77777778",
        "price": 10.9,
        "installments": 9,
        "currencyId": "USD",
        "currencyFormat": "zl",
        "isFreeShipping": true
      },
  
      {
        "id": 13,
        "name": "Dark Thug Blue-Navy T-Shirt",
        "producer": "xx",        
        "description": "",
        "availableSizes": ["M"],
        "code": "11111111",
        "price": 29.45,
        "installments": 5,
        "currencyId": "USD",
        "currencyFormat": "zl",
        "isFreeShipping": true
      },
  
      {
        "id": 14,
        "name": "Sphynx Tie Dye Wine T-Shirt",
        "producer": "xx",        
        "description": "GPX Poly 1",
        "availableSizes": ["X", "L", "XL"],
        "code": "77777777",
        "price": 9.0,
        "installments": 3,
        "currencyId": "USD",
        "currencyFormat": "zl",
        "isFreeShipping": true
      }             
    ] 

class CustomCell extends Component {
    constructor(props) {
        super(props);
        
        this.columns = [
            {
                key: "id",
                text: "Id",                
                sortable: true

            },
            {
                key: "name",
                text: "Nazwa",
                className: "name",
                sortable: true
            },
            {
                key: "producer",
                text: "Producent",
                sortable: true
            },
            {
                key: "code",
                text: "Kod",
                className: "postcode",
                sortable: true
            },
            {
                key: "description",
                text: "Opis",                
                sortable: false
            },            
            {
                key: "color",
                text: "Kolory",                
                sortable: true
            },            
            {
                key: "action",
                text: "Akcja",
                cell: (record, index) => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.editRecord.bind(this, record, index)}
                                style={{marginRight: '5px', width:'4vw'}}>
                                    Edytuj
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                style={{ width:'4vw'}}
                                onClick={this.deleteRecord.bind(this, record, index)}>
                                    Usuń
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            button: {
                excel: false,
                print: false
            }
        }
        this.state = {
            records: products
        }
    }

    static propTypes = {
        toggleModal: PropTypes.func.isRequired,   
        getRecords: PropTypes.func.isRequired,   
      };

    componentWillMount(){
        this.setState({
            records: products
        })
        console.log(this.state.records);
    }

    editRecord = (record, index) => {
        console.log("Edit record", index, record);
        this.props.toggleModal(record)
    }

    deleteRecord = (record, index) => {
        console.log("Delete record", index, record);
    }

    render() {
        return (
            <ReactDatatable
                config={this.config}
                records={this.state.records}
                columns={this.columns}/>
        );
    }
}


export default CustomCell;