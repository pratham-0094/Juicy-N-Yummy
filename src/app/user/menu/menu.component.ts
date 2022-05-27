import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from 'src/app/dialog/cart/cart.component';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { adminProfile } from 'src/app/model/adminProfile';
import { review } from 'src/app/model/review';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDdXe0hajBeJE3JoCGhVISj9i33tInKL9pHw&usqp=CAU';
  profile!: any;
  now!: Number;
  count!: Number;
  id!: String;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private userAuth: UserAuthService,
    private adminServiceAuth: AdminServiceService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.userAuth.getAdminId(this.id).subscribe((data: adminProfile) => {
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

  ngOnInit(): void {}

  reviewRedirect() {
    this.router.navigateByUrl('/admin/dashboard/review');
  }

  opencart() {
    this.dialog.open(CartComponent);
  }
}
