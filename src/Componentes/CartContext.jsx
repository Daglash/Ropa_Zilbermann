import { createContext, useEffect } from "react";
import { useState } from "react";
import React from 'react';



export const CartContext = createContext(); 
 
export const CartProvider = ({children}) => {
    const [cartItems,setCartItems]=useState(() =>{
        try {
            const productosEnLocalStorage = localStorage.getItem('cartProducts');
            return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
        }catch(error){
                return [];
            }
    });

    useEffect(() =>{
     localStorage.setItem('cartProducts',JSON.stringify(cartItems));
        console.log(cartItems)
    }, [cartItems]);

    const addItemtoCart = (product) => {
            const inCart = cartItems.find(
                     (productInCart) => productInCart.id === product.id
                 );
    
            if(inCart){
                setCartItems(
                 cartItems.map((productInCart) => {
                    if (productInCart.id === product.id){
                    return {...inCart , amount: inCart.amount + 1};
                    }else return productInCart;
                 })
                     );
            } else {
                setCartItems([...cartItems,{...product,amount : 1}]);
                }
        };
        // const deleteItemToCart = (product) => {
        //     const inCart = cartItems.find(
        //         (productInCart) => productInCart.id === product.id);
       
        //     if(inCart.amount === 1) {
        //          setCartItems(
        //             cartItems.filter((productInCart) => productInCart.id !== product.id)
        //     );
        //     } else {
        //         setCartItems((productInCart) =>{
        //         if(productInCart.id === product.id) {
        //             return{...inCart,amount: inCart.amount -1 };
        //         }else return productInCart
        //         });
        //     }
        // };
        
    return(
        <CartContext.Provider value={{cartItems,addItemtoCart,}}>
            {/* deleteItemtoCart */}
        {children}
        </CartContext.Provider>

    );
};
