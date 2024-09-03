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

    const existingProduct = cart.find((p: any) => p.id_product === product.id_product);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    this.setCart(cart);
  }

  removeFromCart(product: any) {
    let cart = this.getCart();
    cart = cart.filter((p: any) => p.id_product !== product.id_product);
    this.setCart(cart);
  }

  updateQuantity(product: any, quantity: number) {
    if (quantity < 1) return;

    let cart = this.getCart();
    const existingProduct = cart.find((p: any) => p.id_product === product.id_product);
    if (existingProduct) {
      existingProduct.quantity = quantity;
      this.setCart(cart);
    }
  }

  getTotal() {
    let cart = this.getCart();
    if (cart === null) {
      return 0;
    }
    return cart.reduce((acc: number, p: any) => acc + Number(p.price_product) * p.quantity, 0);
  }

}
