import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/model/cart';
import { CartServiceService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  item!: cart[];
  totalAmount = 0;
  discount = 0;

  constructor(private cartService: CartServiceService) {
    this.item = this.cartService.get();
    this.totalAmount = this.cartService.amount
    this.discount = this.totalAmount * 0.1
  }

  arrayBufferToBase64(buffer: number[]): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  increase(index: number) {
    this.cartService.increment(index);
    this.item = this.cartService.get();
    this.totalAmount = this.cartService.amount;
    this.discount = this.totalAmount * 0.1;
  }

  decrease(index: number) {
    this.cartService.decrement(index);
    this.item = this.cartService.get();
    this.totalAmount = this.cartService.amount;
    this.discount = this.totalAmount * 0.1;
  }

  delete(index: number) {
    this.cartService.remove(index);
    this.item = this.cartService.get();
    this.totalAmount = this.cartService.amount;
    this.discount = this.totalAmount * 0.1;
  }
  
  placeOrder() {
    this.item = this.cartService.placeOrder();
    this.totalAmount = this.cartService.amount;
    this.discount = this.totalAmount * 0.1;
  }

  ngOnInit(): void { }
}
