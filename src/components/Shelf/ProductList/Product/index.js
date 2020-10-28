import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Thumb from '../../../Thumb';
import { formatPrice } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';
import ProductLink from './ProductDetail/productLink';
//zmiana wejscie w produkt
//----Single product cart---- wymiary, materiał i kolor 
//https://xd.adobe.com/view/944c4d09-0b47-4bbf-5596-ab14af5b7662-e27d/

const Product = ({ product, addProduct }) => {
  //product.quantity = 1; must!!
  console.log("dodaje produkt", product)
  let formattedPrice =  formatPrice(product.price, product.currencyFormat);
  let productInstallment;
  let ids = product.id.split("/");
  let id = ids[ids.length-1]
  const directTo = { 
    //pathname: `/Produkt/${ product.name }`, 
    pathname: `/Produkt/${ product.group + "/" + product.producer + "/" + product.name + "/" + id}`, 
    prodId: product.id,     
  };  

  if (!!product.title) {
    //if (!!product.name) {
    const installmentPrice = "" // product.price / product.installments;

    productInstallment = (
/* --Here we can highlight additionals information about product--
      <div className="installment">
        <span>lub {product.installments} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div> */
      <div className="installment">
      
    </div>
    );
  }
//<Link to={directTo} ></Link>
  return (
    
    <div
      className="shelf-item"      
      //data-sku
     // data-sku={product.sku}  
      code={product.code}      
    >
      <ProductLink
         tag="div"                                
         product={product}     
         params={product}             
         to={                      
            directTo            
          }
        
      >
    {/*   {product.isFreeShipping && (
        <div className="shelf-stopper">Darmowa dostawa</div>
      )} */}
      <Thumb
        classes="shelf-item__thumb"
        src={product.mainImage}
        //src={require(`../../../../static/products/${product.sku}_1.jpg`)}
        alt={product.name}
      />
      <p className="shelf-item__title">{product.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
        {productInstallment}
      </div>      
      </ProductLink>
      <div className="shelf-item__buy-btn" onClick={() => addProduct(product)}>
          Dodaj do koszyka
      </div>                             
    </div>    
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct }
)(Product);


//old unchanged

/* 
const Product = ({ product, addProduct }) => {
  product.quantity = 1;

  let formattedPrice = formatPrice(product.price, product.currencyId);

  let productInstallment;

  const directTo = { 
    pathname: `/Produkt/${ product.title }`, 
    prodId: product.id, 
  };  

  if (!!product.installments) {
    const installmentPrice = product.price / product.installments;

    productInstallment = (
/* --Here we can highlight additionals information about product--
      <div className="installment">
        <span>lub {product.installments} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div> 
      <div className="installment">
      
    </div>
    );
  }
//<Link to={directTo} ></Link>
  return (
    
    <div
      className="shelf-item"      
      data-sku={product.sku}      
    >
      <ProductLink
         tag="div"                                
         to={                      
            directTo}                  
      >
      {product.isFreeShipping && (
        <div className="shelf-stopper">Darmowa dostawa</div>
      )}
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../../static/products/${product.sku}_1.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
        {productInstallment}
      </div>      
      </ProductLink>
      <div className="shelf-item__buy-btn" onClick={() => addProduct(product)}>
          Dodaj do koszyka
      </div>                             
    </div>    
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct }
)(Product);
 */