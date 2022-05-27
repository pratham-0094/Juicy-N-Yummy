import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminProfile } from 'src/app/model/adminProfile';
import { items } from 'src/app/model/items';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  item!: items[];
  category!: String[];
  id!: String;

  constructor(
    private itemService: ItemServiceService,
    private cartService: CartServiceService,
    private userAuth: UserAuthService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
    this.userAuth.getAdminId(this.id).subscribe((data: adminProfile) => {
      this.category = data.category;
    });
    this.itemService.getItems(this.id).subscribe((res: items[]) => {
      this.item = res;
    });
  }

  addToCart(k: any) {
    this.cartService.add(this.item[k]);
  }

  filter(name: String) {
    if (name === 'All') {
      this.itemService.getItems(this.id).subscribe((res: items[]) => {
        this.item = res;
      });
    } else {
      this.itemService.getItems(this.id).subscribe((res) => {
        this.item = res.filter((res) => res.category === name);
      });
    }
  }

  ngOnInit(): void {}
}
