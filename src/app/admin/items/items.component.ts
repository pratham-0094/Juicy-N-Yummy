import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminProfile } from 'src/app/model/adminProfile';
import { items } from 'src/app/model/items';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  item!: items[];
  category!: any;
  id!: String;

  constructor(
    private adminServiceAuth: AdminServiceService,
    private adminAuth: AdminAuthService
  ) {
    this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
      this.category = data.category;
    });
    this.adminServiceAuth.getItems().subscribe((res: any[]) => {
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

  remove(id: String) {
    this.adminServiceAuth.removeItems(id).subscribe((res) => {
      console.log(res);
      this.adminServiceAuth.getItems().subscribe((res: items[]) => {
        this.item = res;
      });
    });
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

  filter(name: String) {
    this.adminServiceAuth.getItems().subscribe((res: any[]) => {
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
        this.item = res.filter((i) => i.category === name);
      }
    });
  }

  ngOnInit(): void { }
}
