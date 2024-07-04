import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { inject } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    FooterComponent,
    HeaderComponent
  ]
})
export class ShoppingCartPage implements OnInit {

  cart: any[] = [];
  total: number = 0;
  shoppingCartService = inject(ShoppingCartService);

  constructor() { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.shoppingCartService.getCart();
    this.total = this.shoppingCartService.getTotal();
  }

  removeFromCart(product: any) {
    this.shoppingCartService.removeFromCart(product);
    this.loadCart();
  }
}
