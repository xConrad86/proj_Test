import { FETCH_PRODUCTS } from './actionTypes';
import { GET_PRODUCTLIST } from './actionTypes';
import { GET_PRODUCTSLIST_UNFILTERED } from './actionTypes';
import axios from 'axios';
import { groups, units, productsAPI, apply } from '../util';
import { db } from "./../firebase/firebase";
import firebase from "firebase";
import { arrayOf } from 'prop-types';

function waitForIt(N) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), N);
  });
};

const getFBProducts = () => {
  
  firebase
  .auth()      
  .signInWithEmailAndPassword("lewapoel@gmail.com", "74150925")

    var products = [];
    var qproducts =  db.collection("produkty"); 
   
    const snapshot = qproducts.get().then(
    products = snapshot.docs.map(doc => doc.data())
    //products = snapshot.docs()
  ) 
  
  console.log("mine promise", products.Promise);
  return products
      
  }

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  }
};

function isNumber(val){
  return typeof val==='number';
}

function actionCreator(products, productsList, productsListUF) {
  return dispatch => {    
      dispatch(
        {
          type: FETCH_PRODUCTS,
          payload: products
        }
      )
      
      dispatch({
        type: GET_PRODUCTLIST,
        payload: productsList
      })

      dispatch({
        type: GET_PRODUCTSLIST_UNFILTERED,
        payload: productsListUF
      })
  }
}

function filterQuantity(products, quantity, subsiteNumber){            
    subsiteNumber -= 1;
    let j =  Number(quantity)* Number(subsiteNumber);
    j = Number(j) + Number(quantity);
    console.log("ilosc na stronie:, " + products.length, subsiteNumber, j);  
    if (products.length > quantity ){
      if (subsiteNumber !== undefined){
        products = products.slice(quantity*subsiteNumber, j)
      } else {
        products = products.slice(0,quantity)
      }
    }        
    return products;
}

export const fetchProducts = (filters, sortBy, callback, quantity, subsiteNumber) => dispatch => {

  return axios
   .get(productsAPI)
   .then(res => {
   var tempProducts = res.data;            
   var arrayOfProducts = []    
  // console.log( "json od pawla", tempProducts, Object.values(tempProducts)[0][1].fields);
   console.log("FIREBASE API count!")
   for (var i = 0; i < Object.values(tempProducts)[0].length ; i++) {
      
      var name = Object.values(tempProducts)[0][i].name;      
      var arrFields = Object.values(tempProducts)[0][i].fields          
      var arrImgs = Object.values(arrFields.otherImages)[0];
      var otherImages = [];      
      console.log("pozostale img", (Object.values(arrImgs).length));
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
          "otherImages": otherImages,
          "description": Object.values(arrFields.description)[0],
        }
      );                  
      console.log( "pozostale img", otherImages);
    }                 
    
    tempProducts =  {"products" : arrayOfProducts}
    let {products} = tempProducts 

    console.log( "json od pawla8", products.length, products)   
    
    let productsListUF = products; 
        
     if (!!filters && filters.length > 0) {
      
      var priceFrom = filters.find((f) => f[0] === 'priceFrom');      
      if (priceFrom !== undefined) {
        priceFrom = parseFloat(priceFrom[1]);
        var priceTo = parseFloat(filters.find((f) => f[0] === 'priceTo')[1]);
        console.log('szukam cen', products, priceFrom);
        products = products.filter(
          (p) => p.price >= priceFrom && p.price <= priceTo
        );
     
      }
        //change 20.10.26
      var productSearch = filters.find((f) => f[0].includes('productSearchName'));      
      if (productSearch !== undefined) {
        products = products.filter(
          (p) => p.name.toLowerCase().includes(productSearch[1].toLowerCase()) 
        );
      }

      var productSearch = filters.find((f) => f[0].includes('productSearchCode'));      
      if (productSearch !== undefined) {
        products = products.filter(
          (p) => p.code.includes(productSearch[1])
        );
      }

      var filterGroups = filters.filter(
        (f) => groups.find(g => f[0]=== g)
      ) 
      if (filterGroups !== undefined && filterGroups.length >0){
        products = products.filter(
          (p) => filters.find((f) => f[0] === p.group)
          )
      }      

      var filterUnits = filters.filter(
        (f) => units.find(u => f[0]=== u)
      ) 
      if (filterUnits !== undefined && filterUnits.length >0){
        products = products.filter(
          (p) => filters.find((f) => f[0] === p.unit)
          )
      }      

      var filterApply = filters.filter(
        (f) => apply.find(a => f[0]=== a)
      ) 
      if (filterApply !== undefined && filterApply.length >0){
        products = products.filter(
          (p) => filters.find((f) => f[0] === p.application)
          )
      }      

      var producer = filters.find((f) => f[1] === 'producer');    
      if (producer !== undefined){
        products = products.filter(
          (p) => filters.find((f) => f[0] === p.producer & f[1] === "producer")
        )  
      }      
      
      console.log('produkty po cenie', filterGroups.length, producer, products);
    } 

    if (!!sortBy) {
      products = products.sort(compare[sortBy]);
    }
    console.log('ilosc na stronie fetch:', quantity, products);  
    //Array.from(
    let productsList = products;          

    if (!!subsiteNumber && !!quantity ){        
      products = filterQuantity(products, quantity, subsiteNumber)        
    }

    if (!!callback) {
      callback();
    }      
    
    return dispatch(
      actionCreator(products, productsList, productsListUF)
    );
    
    
   })
  .catch((error) => {
    console.log("Error!");
    alert("Nie można pobrać listy produktów - odśwież stronę", error);
  });                        
};




/*

function filterQuantity(products, quantity, subsiteNumber){            
    subsiteNumber -= 1;
    let j =  Number(quantity)* Number(subsiteNumber);
    j = Number(j) + Number(quantity);
    console.log("ilosc na stronie:, " + products.length, subsiteNumber, j);  
    if (products.length > quantity ){
      if (subsiteNumber !== undefined){
        products = products.slice(quantity*subsiteNumber, j)
      } else {
        products = products.slice(0,quantity)
      }
    }        
    return products;
}

export const fetchProducts = (filters, sortBy, callback, quantity, subsiteNumber) => dispatch => {
  return axios
    .get(productsAPI)
    .then(res => {
    //  let { products } = res.data;         
      
      var products  = getProducts();
      console.log("Produkty od pawla", getProducts(), products);
      let productsListUF = Array.from(products); 

        if (!!filters && filters.length > 0) {
         
            var priceFrom = filters.find(f => f[0] === "priceFrom");
           //feature number 2 price  
           //priceFrom && p.price <= priceTo
            if (priceFrom!== undefined) {
                priceFrom = parseFloat(priceFrom[1])
                var priceTo = parseFloat(filters.find(f => f[0] === "priceTo")[1]);
                console.log("szukam cen", products, priceFrom)
                products = products.filter(p =>  p.price >= priceFrom && p.price <= priceTo );                      
             }     
        console.log("produkty po cenie", products)    
        
        
        //feature number 1  - size?  warunek jesli odnajde jaki
        products = products.filter(p =>
          filters.find(f => p.availableSizes.find(size => size === f[0]))
        );                

      }  

      if (!!sortBy) {
        products = products.sort(compare[sortBy]);
      }
      console.log("ilosc na stronie fetch:" , quantity, products);  
      //if (subsiteNumber !== undefined && quantity !== undefined){
      //ADDED TO KEEP FULL LIST OF PRODUCTS
      //   setProducts(products);
      let productsList = Array.from(products);       

      if (!!subsiteNumber && !!quantity ){        
        products = filterQuantity(products, quantity, subsiteNumber)        
      }

      if (!!callback) {
        callback();
      }      
      
      return dispatch(
        actionCreator(products, productsList, productsListUF)
      );
    })
    .catch(err => {
      console.log('Could not fetch products. Try again later.');
    });
};

 */