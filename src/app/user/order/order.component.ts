import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminProfile } from 'src/app/model/adminProfile';
import { items } from 'src/app/model/items';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  item!: items[];
  category!: any;
  id!: String;

  constructor(
    private adminServiceAuth: AdminServiceService,
    private adminAuth: AdminAuthService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    if (this.location.path() === '/admin/dashboard/order') {
      this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
        this.category = data.category;
        this.id = data._id;
        this.adminServiceAuth.getItems(this.id).subscribe((res: items[]) => {
          this.item = res;
        });
      });
    } else {
      this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
        this.category = data.category;
      });
      this.route.params.subscribe((params) => {
        this.id = params['id'];
        this.adminServiceAuth.getItems(this.id).subscribe((res: items[]) => {
          this.item = res;
        });
      });
    }
  }

  remove(id: String) {
    this.adminServiceAuth.removeItems(id).subscribe((res) => {
      console.log(res);
      this.adminServiceAuth.getItems(this.id).subscribe((res: items[]) => {
        this.item = res;
      });
    });
  }

  ngOnInit(): void {}
}
