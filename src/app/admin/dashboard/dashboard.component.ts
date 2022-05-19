import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
