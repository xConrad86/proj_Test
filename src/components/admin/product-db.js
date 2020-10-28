import react from 'react';
import config from './config-db';
import Firebase from 'firebase';
import ProductForm from '/product-form';

class ProductDb extends React.Component(){
    constructor(props){
        super(props);
        Firebase.initializeApp(config.firebase);
    
        this.state = {
          product: []
        }
      }

       componentDidMount() {
        this.Products();
      } 
    
      componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
          this.writeUserData();
        }
      }

      writeProductData = () => {
        Firebase.database().ref('/').set(this.state);
        console.log('DATA SAVED');
      }
      
       getProducts = () => {
        let ref = Firebase.database().ref('/');
        ref.on('value', snapshot => {
          const state = snapshot.val();
          this.setState(state);
        });
        console.log('DATA RETRIEVED');
      } 

      handleSubmit = event => {
        event.preventDefault();
    
          const { product } = this.state;
          product.push({ uid, name, role });
          this.setState({ product });
          product = [];
      }                  
    
      removeData = product => {
        const { products } = this.state;
        const newState = products.filter(data => {
          return data.id !== product.id;
        });
        this.setState({ products: newState });
      }          
    
      render() {    
        const { products } = this.state;
        return (
          <React.Fragment>
            <ProductForm/>
          </React.Fragment>
        );
      }

}