import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDdXe0hajBeJE3JoCGhVISj9i33tInKL9pHw&usqp=CAU';

  restaurant = {
    name: 'Pizza Hut',
    category: ['Pizza', 'Burger'],
    address: 'Janjgir chowk, Naila',
    time: [9, 12],
    status: 'Open',
    Reviews: 23,
  };
  cart = [{}];

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
