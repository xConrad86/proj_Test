import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cart from './Cart';
import AdminPanel from './components/admin/admin-panel';
import ShippingNavigator from './components/Shipping/index';
import ProductDetail from './pages/ProductDetail'
import {withRouter} from 'react-router';
//zmiana wejscie w produkt
const Router = () => (
    <Switch>        
        <Route exact path="/" component ={Cart} />        
        <Route path="/Shop" component ={Cart} />     
        <Route path="/Ship" component ={ShippingNavigator} />                        
        <Route path="/Admin" component ={AdminPanel} /> 
        <Route path="/Produkt/:name/:id" component ={ProductDetail} />                        
    </Switch>
)

export default Router;