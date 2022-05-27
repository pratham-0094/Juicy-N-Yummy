import { Injectable } from '@angular/core';
import { cart } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  item: cart[] = [];

  add(addItem: any) {
    let found = false;
    let k!: any;
    if (this.item.length > 0) {
      this.item.forEach((i, index) => {
        if (i._id === addItem._id) {
          found = true;
          k = index;
        }
      });
      if (found) {
        this.item[k].quantity += 1;
      } else {
        addItem.quantity = 1;
        this.item.push(addItem);
      }
    } else {
      addItem.quantity = 1;
      this.item.push(addItem);
    }
  }

  remove(i: any) {
    this.item.splice(i, 1);
  }

  increment(i: any) {
    if (this.item[i].quantity < 10) {
      this.item[i].quantity += 1;
    }
  }

  decrement(i: any) {
    this.item[i].quantity -= 1;
    if (this.item[i].quantity === 0) {
      this.item.splice(i, 1);
    }
  }

  get() {
    return this.item;
  }

  constructor() {}
}
