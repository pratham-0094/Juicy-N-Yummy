import { Component, OnInit } from '@angular/core';

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

  category = [
    {
      origin: 'Dessert',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJA5Shz4dzZUnzbhe02HaeL2IR7tdV7KKO5Q&usqp=CAU',
    },
    {
      origin: 'Soup',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgEt4_PIfpEK4D9GxGFiGbsyNlE5xaUseAyC31cwp9Augu_4kSGKF1CDL_I76QyLTrJM&usqp=CAU',
    },
    {
      origin: 'Beverage',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0rVOoROXkuPOZxWBMvxdwblbRD5p4LcNqBw&usqp=CAU',
    },
    {
      origin: 'Fast food',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVUXUNunkLw6GbIGmsOFuLwqqgAuWNeCPENRW4LotkyXg_xixOJF6DQ2vnRFYhaHh2I8&usqp=CAU',
    },
    {
      origin: 'All',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVUXUNunkLw6GbIGmsOFuLwqqgAuWNeCPENRW4LotkyXg_xixOJF6DQ2vnRFYhaHh2I8&usqp=CAU',
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  clicked() {
    console.log('idsdj');
  }
  select_origin(e: string) {
    console.log(e);
  }
}
