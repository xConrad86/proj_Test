import React from 'react';
import Shelf from './components/Shelf';
import Filter from './components/Shelf/Filter';
import FloatCart from './components/FloatCart';
//https://xd.adobe.com/view/511a4892-c551-4fcd-4cba-428e02401a9b-272b/screen/d1805c61-95a0-42bf-8ed2-e15f1b08b8de/
function Cart (){

    return (
        <div>
        <main>
          <Filter />
           <Shelf />
        </main>
        <FloatCart />
        </div>
    )
}

export default Cart;
    
  