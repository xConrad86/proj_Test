import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import ProductCarousel from './carousel'
import { addProduct } from '../../../../../services/cart/actions';
import {connect} from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../../../../../services/cart/actions';
import {updateCart} from '../../../../../services/total/actions'
import axios from 'axios';
import './style.scss';
//api do wyciagania produktu
const productsAPI = "https://firestore.googleapis.com/v1/projects/slaskie-centrum-stolarskie/databases/(default)/documents/produkty?name=projects/slaskie-centrum-stolarskie/databases/(default)/documents/produkty/"

class ProductDetail extends Component {
  constructor(props) {
    super(props);  
    console.log("props product detail", props, props.prodLocation)
    this.state = {
      product: undefined,            
      images: [],
      quantity: 0,
      isLoading: true
    };    
        
    this.getCartQuantity = this.getCartQuantity.bind(this);
    this.getSupply = this.getSupply.bind(this);    
  }

  static propTypes = {
    product: PropTypes.object.isRequired,
    prodLocation: PropTypes.string.isRequired,
    addProduct: PropTypes.func.isRequired,
    loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
    changeProductQuantity: PropTypes.func,
    productToChange: PropTypes.object,
  }


  
  componentDidMount() {  
    var {products} =[];
    if(this.state.product === undefined) {
      
      let ids = this.props.prodLocation.split("/");
      let id = ids[ids.length-1]
      
      axios.get(productsAPI + id)
      
      .then(res => {
      var tempProducts = res.data;            
      var arrayOfProducts = []    
      console.log("res data",res.data);
      // console.log( "json od pawla", tempProducts, Object.values(tempProducts)[0][1].fields);
      console.log("FIREBASE API count!", Object.values(tempProducts)[1])
      //console.log("FIREBASE API count!", Object.values(tempProducts)[0])
      
          var name = Object.values(tempProducts)[0];      
          var arrFields = Object.values(tempProducts)[1]
          var arrImgs = Object.values(arrFields.otherImages)[0];
          var otherImages = [];      
          
          if(Object.values(arrImgs).length > 0){
            for (var j = 0; j < Object.values(arrImgs).length ; j++) {
                otherImages.push(Object.values(arrImgs)[j][0])                  
            }
          }      
          
          arrayOfProducts.push(
            {   
              "id" : name,        
              "application" : Object.values(arrFields.application)[0],
              "code" : Object.values(arrFields.code)[0],
              "name" : Object.values(arrFields.name)[0],
              "price" : parseFloat(Object.values(arrFields.grossPrice)[0]),
              "currencyFormat" : Object.values(arrFields.currencyFormat)[0],
              "quantity" : 1,
              "producer" : Object.values(arrFields.producer)[0],
              "mainImage" : Object.values(arrFields.mainImage)[0],
              "type" : Object.values(arrFields.type)[0],
              "group" : Object.values(arrFields.group)[0],
              "subGroup" : Object.values(arrFields.subGroup)[0],
              "unit" : Object.values(arrFields.uom)[0],
              "availability" : arrFields.availability === undefined ? "czerwony" : Object.values(arrFields.availability)[0],
              "otherImages" : otherImages, 
              "description": Object.values(arrFields.description)[0],
            }
          );                      
        
        
        products = arrayOfProducts;
        var imgs = [];
        imgs.push(products[0].mainImage)                                        
        for(let i = 0; i < otherImages.length; i++){
          
          imgs.push(Object.values(otherImages[i]));
        }
                   
        this.setState({
                product: products[0], isLoading: false, images: imgs,
                quantity: this.getCartQuantity(products[0])
        })                      
      })
      .catch((error) => {
        console.log("Error!");    
        alert("Nie można pobrać listy produktów - odśwież stronę", error);
      });         
    } else if (this.props.product !== undefined){
        var imgs = [];
        imgs.push(this.props.product.mainImage)    
        for(let i = 0; i < this.props.otherImages.length; i++){
          
          imgs.push(Object.values(this.props.otherImages[i]));
        }                                    

        this.setState({
        product: this.props.product,         
        images: imgs,
        isLoading: false
      })   
    }      
    console.log("montuje")
  }

  getSupply(quantity){
      const red = "#980000"; 
      const green = "#6aa84f";
      const yellow = "#f1c232";
      var supplyCol = yellow;

      if (quantity !== undefined  ){
        if(quantity === "pomarańczowy" ){
            supplyCol = yellow;
        } else if(quantity === "zielony"){
            supplyCol = green;
        } else if(quantity === "czerwony"){
          supplyCol = red;
        }
      }

      return <div style={{width:"20px ", height:"20px", backgroundColor:supplyCol}}>
        
      </div>
  }

  getCartQuantity(product){
    const { cartProducts } = this.props; 
    console.log("xxx", cartProducts);
    var quantity = 0;
    cartProducts.forEach(cp => {
      if (cp.id === product.id) {                    
        quantity = cp.quantity;
      }
    });    
    
    return quantity;
  }     

  addProd = product => {
    //modified 20.10.13  
    const { updateCart, cartProducts } = this.props;    
    let productAlreadyInCart = false;        
    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += 1;
        productAlreadyInCart = true;        
      }
    });
    console.log(product.id, productAlreadyInCart)
    if (!productAlreadyInCart) {      
      this.state.product.quantity = 1;
      cartProducts.push(this.state.product);
    }
    updateCart(cartProducts);
  };
 
  removeProd = product => {
    const { cartProducts, updateCart } = this.props;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        if (cp.quantity > 0 ){
          cp.quantity -= 1;          
          if (cp.quantity === 0){
            cartProducts.splice(product, 1);           
          }
        } else {
          cartProducts.splice(product, 1);         
        }                
      }
    })        
      updateCart(cartProducts);
     };

  render(){   
    const product = this.state.product;
    const isLoading = this.state.isLoading;
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
    
    return (      
    <div>
      <div className="product-detail-container">  
          <div className="product-detail-container-leftview">
            <div className="product-detail-container-leftview-header">
              <div>{product.group + "/" + product.producer + "/"}</div>
              <div className="product-detail-container-leftview-header-product">{product.name}</div>             
            </div>               
            <div className="product-detail-container-leftview-gallery">
             { <ProductCarousel props={  this.state.images }/>  
             }                     
            </div>     
          </div>     
          <div className="product-detail-container-rightview">
             <div className="product-detail-container-rightview-header">
                <div className="product-detail-container-rightview-header-elem">
                  Termin wysyłki
                  <div className="product-detail-container-rightview-header-ship">
                    Wysyłka w ciągu 2 dni roboczych
                  </div>       
                </div>
                <div className="product-detail-container-rightview-header-elem">
                  Szybka wysyłka 
                  <div className="product-detail-container-rightview-header-ship">
                      Zapytaj w sklepie
                  </div>                       
                </div>
             </div>   
             <div className="product-detail-container-rightview-body">
              <div className="product-detail-container-rightview-body-product">
                {product.name}  
              </div>    
              <div className="product-detail-container-rightview-body-product-price">
                {product.price + " " + product.currencyFormat}  
              </div>    
              <div className="product-detail-container-rightview-body-product-props">
              <div>DOSTĘPNOŚĆ</div>
               <div className="product-detail-container-rightview-body-product-props-desc"> {
               this.getSupply(product.availability)}  </div> 
               <div>POJEMNOŚĆ</div>
               <div className="product-detail-container-rightview-body-product-props-desc">{product.unit}  </div> 
                <div>PRODUCENT</div>
                <div className="product-detail-container-rightview-body-product-props-desc">{product.producer}  </div> 
                <div>TYP</div>
                <div className="product-detail-container-rightview-body-product-props-desc">
                  { product.type}  </div> 
                <div>ZASTOSOWANIE</div>
                <div className="product-detail-container-rightview-body-product-props-desc">{product.appication}  </div> 
              </div>    
              <div className="product-detail-container-rightview-footer">
                <div className="product-detail-container-rightview-footer-inc-btn">
                  <button 
                  onClick={() => this.removeProd( product)}
                  className="product-detail-container-rightview-footer-inc-btn-btn">
                    -
                  </button>
                  <div className="product-detail-container-rightview-footer-inc-btn-quantity">
                    {this.getCartQuantity(product)}
                  </div>
                  <button 
                  onClick={() => this.addProd( product)}
                  className="product-detail-container-rightview-footer-inc-btn-btn">
                    +
                  </button>
                </div>
                
                <button 
                onClick={() => this.addProd( product)}
                className="product-detail-container-rightview-footer-buy-btn">
                Dodaj do koszyka
                </button>

             </div>
             </div>    
            
          </div>      
          

      </div>
      <div className="product-detail-specification">
          {product.description}
      </div>      
    </div>
      
    );
  }
  
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  productToChange: state.cart.productToChange,
  cartTotal: state.total.data
});

export default connect(  
  mapStateToProps,
  { loadCart, updateCart, removeProduct, changeProductQuantity }
)(ProductDetail);


