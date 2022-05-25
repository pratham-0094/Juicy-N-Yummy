import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditadminComponent } from 'src/app/dialog/editadmin/editadmin.component';
import { adminProfile } from 'src/app/model/adminProfile';
import { AdminAuthService } from 'src/app/service/admin-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDdXe0hajBeJE3JoCGhVISj9i33tInKL9pHw&usqp=CAU';

  profile!: any;
  now!: Number;

  constructor(
    public router: Router,
    private adminAuth: AdminAuthService,
    public dialog: MatDialog
  ) {
    this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
      this.profile = {
        restaurant: data.restaurant,
        category: data.category,
        address: data.address,
        duration: data.duration,
        status: data.status,
        Reviews: 23,
      };
    });
    this.now = new Date().getHours();
  }

  openedit() {
    this.dialog.open(EditadminComponent);
  }

  ngOnInit(): void {}
}
