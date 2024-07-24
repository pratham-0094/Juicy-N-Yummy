import { Injectable } from '@angular/core';
import { cart } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  item: cart[] = [];
  amount: number = 0;

  add(addItem: any) {
    let found = false;
    let k = 0;
    if (this.item.length > 0) {
      this.item.forEach((i, index) => {
        if (i._id === addItem._id) {
          found = true;
          k = index;
        }
      });
      if (found) {
        if (this.item[k].quantity < 9) {
          this.item[k].quantity += 1;
          this.amount = addItem.price;
        }
        return
      }
    }
    addItem.quantity = 1;
    this.item.push(addItem);
    this.amount += addItem.price;
  }

  remove(index: number) {
    this.amount = this.amount - (this.item[index].quantity * this.item[index].price); // Update the amount
    this.item.splice(index, 1);
  }

  increment(index: number) {
    if (this.item[index].quantity < 9) {
      this.item[index].quantity += 1;
      this.amount = this.amount + this.item[index].price; // Update the amount
    }
  }

  decrement(index: number) {
    this.amount = this.amount - this.item[index].price; // Update the amount
    this.item[index].quantity -= 1;
    if (this.item[index].quantity === 0) {
      this.item.splice(index, 1);
    }
  }

  get() {
    return this.item;
  }

  placeOrder() {
    this.item = []
    return this.item;
  }

  constructor() { }
}
