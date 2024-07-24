import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { items } from 'src/app/model/items';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
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

  // category = [
  //   {
  //     origin: 'Dessert',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIUnXgG2p_DWKadqj-WPpXOIFxoqalvaBCjg&usqp=CAU',
  //   },
  //   {
  //     origin: 'Soup',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo8N28JNH2S-On3K-DY9T_ypbHYishTEjAXQ&usqp=CAU',
  //   },
  //   {
  //     origin: 'Beverage',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSatd2YVK9veG8NDmDJya7V0gbYNy_9yXEJyl_tEN31c60SAE0q5XbjWkqWXL8pnnwjVIE&usqp=CAU',
  //   },
  //   {
  //     origin: 'Fast food',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs90UOinP_CL8jH8ogFDMyALHTSZZm57wd12hyRRc6MBf_npxCocjotqU8cNAw-vCbdA4&usqp=CAU',
  //   },
  // ];

  @ViewChild('loadMoreTrigger', { static: false }) loadMoreTrigger!: ElementRef;
  lastFilter: String = "";
  item: items[] = [];
  currentPage = 1;
  isLoading = false;

  constructor(
    private restaurantService: RestaurantServiceService
  ) { }

  ngOnInit(): void {
    this.getOrigin("");
  }

  ngAfterViewInit(): void {
    this.createObserver();
  }

  createObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading) {
          this.loadMoreItems();
        }
      });
    });

    observer.observe(this.loadMoreTrigger.nativeElement);
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
    this.currentPage = 1;
    this.isLoading = true;
    if (e == this.lastFilter) {
      this.restaurantService.getAll(this.currentPage).subscribe((res: any[]) => {
        res.forEach(product => {
          if (product.img && product.img.data && product.img.data.data) {
            product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
          } else {
            product.imgBase64 = null;
          }
        });
        this.item = res;
        this.isLoading = false;
      });
      this.lastFilter = "";
    } else {
      this.restaurantService.getByOrigin(e, 1).subscribe((res: any[]) => {
        res.forEach(product => {
          if (product.img && product.img.data && product.img.data.data) {
            product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
          } else {
            product.imgBase64 = null;
          }
        });
        this.item = res;
        this.isLoading = false;
      });
      this.lastFilter = e;
    }
    this.currentPage++;
  }

  loadMoreItems() {
    if (this.currentPage < 1) return;
    this.isLoading = true;
    if (this.lastFilter) {
      this.restaurantService.getByOrigin(this.lastFilter, this.currentPage).subscribe((res: any[]) => {
        if (res.length < 10) {
          this.currentPage = -1;
        } else {
          this.currentPage++;
          res.forEach(product => {
            if (product.img && product.img.data && product.img.data.data) {
              product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
            } else {
              product.imgBase64 = null;
            }
          });
          this.item = this.item.concat(res);
          this.isLoading = false;
        }
      });
    } else {
      this.restaurantService.getAll(this.currentPage).subscribe((res: any[]) => {
        if (res.length < 10) {
          this.currentPage = -1;
        } else {
          this.currentPage++;
          res.forEach(product => {
            if (product.img && product.img.data && product.img.data.data) {
              product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
            } else {
              product.imgBase64 = null;
            }
          });
          this.item = this.item.concat(res);
          this.isLoading = false;
        }
      });
    }
  }

  // getCategory(e: String) {
  //   if (e == this.lastFilter) {
  //     this.restaurantService.getAll().subscribe((res: any[]) => {
  //       res.forEach(product => {
  //         if (product.img && product.img.data && product.img.data.data) {
  //           product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
  //         } else {
  //           product.imgBase64 = null;
  //         }
  //       });
  //       this.item = res;
  //     });
  //     this.lastFilter = "";
  //   } else {
  //     this.restaurantService.getByCategory(e).subscribe((res: any[]) => {
  //       res.forEach(product => {
  //         if (product.img && product.img.data && product.img.data.data) {
  //           product.imgBase64 = this.arrayBufferToBase64(product.img.data.data);
  //         } else {
  //           product.imgBase64 = null;
  //         }
  //       });
  //       this.item = res;
  //     });
  //     this.lastFilter = e;
  //   }
  // }
}
