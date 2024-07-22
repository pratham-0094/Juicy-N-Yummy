import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/model/cart';
import { items } from 'src/app/model/items';
import { CartServiceService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  item!: cart[];

  constructor(private cartService: CartServiceService) {
    this.item = this.cartService.get();
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

  increase(i: any) {
    this.cartService.increment(i);
    this.item = this.cartService.get();
  }

  decrease(i: any) {
    this.cartService.decrement(i);
    this.item = this.cartService.get();
  }

  delete(i: any) {
    this.cartService.remove(i);
  }

  ngOnInit(): void {}
}
