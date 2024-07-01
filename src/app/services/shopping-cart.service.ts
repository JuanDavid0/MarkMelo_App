import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  getCart() {
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  setCart(cart: any) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: any) {
    let cart = this.getCart();
    if (cart === null) {
      cart = [];
    }
    cart.push(product); // 
    this.setCart(cart);
  }

  removeFromCart(product: any) {
    let cart = this.getCart();
    cart = cart.filter((p: any) => p.id_product !== product.id_product);
    this.setCart(cart);
  }

  getTotal() {
    let cart = this.getCart();
    if (cart === null) {
      return 0;
    }
    return cart.reduce((acc: number, p: any) => acc + Number(p.price_product), 0);
  }

  /*getQuantity() {
    let cart = this.getCart();
    if (cart === null) {
      return 0;
    }
    return cart.length;
  }

  isInCart(product: any) {
    let cart = this.getCart();
    if (cart === null) {
      return false;
    }
    return cart.some((p: any) => p.id === product.id);
  }*/



  
}
