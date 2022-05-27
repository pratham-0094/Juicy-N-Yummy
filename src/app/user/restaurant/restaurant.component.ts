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
  origin_value: boolean = true;
  category_value: boolean = true;
  

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
    this.restaurantService.getAll();
    this.intialize();
  }

  ngOnInit(): void {}

  intialize() {
    this.restaurantService.getAll().subscribe((res: any) => {
      this.item = res;
    });
  }

  getOrigin(e: String) {
    this.restaurantService.getByOrigin(e).subscribe((res: any) => {
      this.item = res;
    });
    this.origin_value = false;
    this.category_value = true;
  }

  getCategory(e: String) {
    this.restaurantService.getByCategory(e).subscribe((res: any) => {
      this.item = res;
    });
    this.origin_value = true;
    this.category_value = false;
  }

}
