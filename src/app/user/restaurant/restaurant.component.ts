import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { items } from 'src/app/model/items';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  lastFilter: String = "";
  origin = [
    {
      origin: 'Chinese',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrSodh2_bz3T_LLA16yP9WdpyAoAUkC5-TdA&usqp=CAU',
    },
    {
      origin: 'Continental',
      image:
        'https://static.toiimg.com/thumb/msid-84288030/84288030.jpg?width=500&resizemode=4',
    },
    {
      origin: 'Italian',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRsrCDM7b_XxQcmKL5SiYI4IyWT00RYrE4g&usqp=CAU',
    },
    {
      origin: 'Mexican',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyG9Z5518nyi48BWPsU8HfUGxBPs-BLJoroJ45zumm2fwOJnaQ4YLW7e5a5hZuMmWSeKM&usqp=CAU',
    },
    {
      origin: 'South Indian',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkLa7jC80tDwEKm8Ask71scJnzl0j8Zr6vQ&usqp=CAU',
    },
  ];

  category = [
    {
      origin: 'Dessert',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIUnXgG2p_DWKadqj-WPpXOIFxoqalvaBCjg&usqp=CAU',
    },
    {
      origin: 'Soup',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo8N28JNH2S-On3K-DY9T_ypbHYishTEjAXQ&usqp=CAU',
    },
    {
      origin: 'Beverage',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSatd2YVK9veG8NDmDJya7V0gbYNy_9yXEJyl_tEN31c60SAE0q5XbjWkqWXL8pnnwjVIE&usqp=CAU',
    },
    {
      origin: 'Fast food',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs90UOinP_CL8jH8ogFDMyALHTSZZm57wd12hyRRc6MBf_npxCocjotqU8cNAw-vCbdA4&usqp=CAU',
    },
  ];

  item!: items[];

  constructor(
    private restaurantService: RestaurantServiceService,
    private router: Router
  ) {
    this.intialize();
  }

  ngOnInit(): void { }

  intialize() {
    this.restaurantService.getAll().subscribe((res: any[]) => {
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

  arrayBufferToBase64(buffer: number[]): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  getOrigin(e: String) {
    if (e == this.lastFilter) {
      this.restaurantService.getAll().subscribe((res: any[]) => {
        res.forEach(product => {
          if (product.img && product.img.data && product.img.data.data) {
            product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
          } else {
            product.imgBase64 = null;
          }
        });
        this.item = res;
      });
      this.lastFilter = "";
    } else {
      this.restaurantService.getByOrigin(e).subscribe((res: any[]) => {
        res.forEach(product => {
          if (product.img && product.img.data && product.img.data.data) {
            product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
          } else {
            product.imgBase64 = null;
          }
        });
        this.item = res;
        console.log(res);
      });
      this.lastFilter = e;
    }
  }

  getCategory(e: String) {
    if (e == this.lastFilter) {
      this.restaurantService.getAll().subscribe((res: any[]) => {
        res.forEach(product => {
          if (product.img && product.img.data && product.img.data.data) {
            product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
          } else {
            product.imgBase64 = null;
          }
        });
        this.item = res;
      });
      this.lastFilter = "";
    } else {
      this.restaurantService.getByCategory(e).subscribe((res: any[]) => {
        res.forEach(product => {
          if (product.img && product.img.data && product.img.data.data) {
            product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
          } else {
            product.imgBase64 = null;
          }
        });
        this.item = res;
      });
      this.lastFilter = e;
    }
  }

}
