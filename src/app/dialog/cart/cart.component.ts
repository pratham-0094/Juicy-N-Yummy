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
