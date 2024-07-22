import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminProfile } from 'src/app/model/adminProfile';
import { items } from 'src/app/model/items';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  item!: items[];
  category!: String[];
  id!: String;

  arrayBufferToBase64(buffer: number[]): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  constructor(
    private itemService: ItemServiceService,
    private cartService: CartServiceService,
    private userAuth: UserAuthService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
    this.userAuth.getAdminId(this.id).subscribe((data: adminProfile) => {
      this.category = data.category;
    });
    this.itemService.getItems(this.id).subscribe((res: any[]) => {
      res.forEach(product => {
        if (product.img && product.img.data && product.img.data.data) {
          product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
        } else {
          product.imgBase64 = null;
        }
      });
      this.item = res;
    });
  }

  addToCart(k: any) {
    this.cartService.add(this.item[k]);
  }

  filter(name: String) {
    this.itemService.getItems(this.id).subscribe((res: any[]) => {
      res.forEach(product => {
        if (product.img && product.img.data && product.img.data.data) {
          product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
        } else {
          product.imgBase64 = null;
        }
      });
      if (name === 'All') {
        this.item = res;
      } else {
        this.item = res.filter((res) => res.category === name);;
      }
    })
  }

  ngOnInit(): void { }
}
