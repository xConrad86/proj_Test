import React from 'react';
import inPost from '../../../images/inposglogo.svg';
import ListGroup from 'react-bootstrap/ListGroup';
import './providerstyle.scss';
import InputRange from 'react-input-range';

const createRangePriceSlider = () => (
  <InputRange
  maxValue={30}
  minValue={0}
  value={20}
   />

);

class InpostShipp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
      provider: '',
      data: [
        { provider: 'DHL', price: 10.0 },
        { provider: 'inPost', price: 12.99 },
        { provider: 'inPost-paczkomaty', price: 12.99 },
      ],
    };
    this.onSiteChanged = this.onSiteChanged.bind(this);
  }

  onSiteChanged(event) {
    this.setState({
      provider: event.target.value,
    });

    if (event.target.value === 'inPost-paczkomaty') {
      this.setState({
        showMap: true,
      });
    } else {
      this.setState({
        showMap: false,
      });
    }
  }

  getItems() {
    return this.state.data.map((dataItem) => (
      <tr key={dataItem.provider}>
        <td>
          <input
            type="radio"
            name="provider"
            value={dataItem.provider}
            checked={this.state.provider === dataItem.provider}
            onChange={this.onSiteChanged}
            className="td_provider"
          />
          {dataItem.provider}
        </td>
        <td>
          <div name="address">{dataItem.price}</div>
        </td>
      </tr>
    ));
  }

  getModalLocation(){
   window.openModal();        
   
  }

  render() {
    return (
      <div>
        <table className="ship_table">        
          <thead>            
            <tr>
              <th>Wybierz dostawcę</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
          {this.getItems()}
          </tbody>
        </table>
        {this.state.showMap ? (
          <div>
          <button onClick={() => this.getModalLocation()}>
            Wybierz lokalizację
          </button>
          <div id="chosenAdd"> </div>
          
          </div>
        ) : null}          
      </div>
    );
  }
}

export default InpostShipp;
