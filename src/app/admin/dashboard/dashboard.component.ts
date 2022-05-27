import { _RecycleViewRepeaterStrategy } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditadminComponent } from 'src/app/dialog/editadmin/editadmin.component';
import { adminProfile } from 'src/app/model/adminProfile';
import { items } from 'src/app/model/items';
import { review } from 'src/app/model/review';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminServiceService } from 'src/app/service/admin-service.service';

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
  count!: Number;

  constructor(
    public router: Router,
    private adminAuth: AdminAuthService,
    private adminServiceAuth: AdminServiceService,
    public dialog: MatDialog
  ) {
    this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
      this.adminServiceAuth.getReview(data._id).subscribe((res: review[]) => {
        this.count = res.length;
        this.profile = {
          restaurant: data.restaurant,
          category: data.category,
          address: data.address,
          duration: data.duration,
          status: data.status,
          Reviews: this.count,
        };
      });
    });
    this.now = new Date().getHours();
  }

  openedit() {
    this.dialog.open(EditadminComponent);
  }

  ngOnInit(): void {}
}
