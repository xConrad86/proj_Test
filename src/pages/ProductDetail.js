import React from 'react';
import ProductDet from './../components/Shelf/ProductList/Product/ProductDetail/productDetail'
import FloatCart from './../components/FloatCart';

class ProductDetail extends React.Component {
    constructor(props){
        super(props);
        console.log("odbieram propsy", props, props.location.pathname);                             
    }
    render()
    {
        var product;
        if (this.props.location.state !== undefined){
            product = this.props.location.state.product;
        }
        console.log("odbieram propsy", product);                             
    return (                            
           <div>
            <main>
                <ProductDet product={product} prodLocation={this.props.location.pathname}/>                     
            </main>
            <FloatCart />
           </div>
    )
    //    <Link to="/Shop">Wróć do listy produktów</Link>            
     }        
}
export default ProductDetail; 

