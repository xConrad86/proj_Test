import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from 'react-image-gallery';

const getItems = (props) => {
    var imgs = [];
    var images = props.props;
    console.log("product detail imgs:", images, );
    for(var i = 0; i < images.length; i++){        
        imgs.push(
            {
                original: images[i],  thumbnail: images[i]         
            }
        )
        console.log(images[i])
    }
    return imgs;
}

const ProductCarousel = (props) => (
      
    <ImageGallery 
        autoPlay={true}
        thumbnailPosition="left"
        showPlayButton={false}
        items={getItems(props)}
        showNav={false}
        showFullscreenButton={true}    
        
        
         />    
  
/*   <Carousel 
    dynamicHeight={true}
    centerMode={false}
    axis={"horizontal"}    
    >
    {getItems(props)}        
  </Carousel> */
);

export default ProductCarousel;