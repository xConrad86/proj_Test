import React, { useState, useEffect } from 'react';

export const groups = ['Lakiery, farby, oleje', 'Kleje', 'Silikony', 'Bejce, patyny','Uszczelki drzwiowe', 'Narzędzia', 'Materiały ścierne', 
'Okleiny, obłogi, lamele', 'Obrzeża naturalne', 'Elementy złączne', 'Płyty', 'Okucia budowlane', 'Krzesła', 'Podłogi']
export const units = ['szt','litr','kg', 'opak', 'm2', 'mb'];
export const apply = ['Wewnętrzny', 'Zewnętrzny'];
export const subGroups = ['Podkładowy', 'Utwardzacz', 'Nawierzchniowy'];
export const producers = [
  'Hesse Lignal',
   'Sivam',
   'Sikkens',
   'Alcea', 
   'Libra', 
   'Lakma', 
   'Sopur', 
   'Deventer',
   'AiB', 
   'Schlegel',
   'Ottensten',
   '3M', 
   'Kuper', 
   'CMT', 
   'Kovax', 
   'SIA', 
   'Indasa', 
   'Wkręt-met',
   'Gerda', 
   'Simonswerk', 
   'Koblenz', 
   'Otlav', 
  ]


export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

export const productsAPI =
 // 'https://react-shopping-cart-67954.firebaseio.com/products.json';
   'https://firestore.googleapis.com/v1/projects/slaskie-centrum-stolarskie/databases/(default)/documents/produkty?key=AIzaSyAMrKvvYBziy8JXJiLjdkxZXWiALY3J0pw'
// export const productsAPI = "http://localhost:8001/api/products";
