import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminProfile } from 'src/app/model/adminProfile';
import { items } from 'src/app/model/items';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
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
    private userServiceAuth: ItemServiceService,
    private userAuth: UserAuthService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id') ?? ""; 
      console.log(this.id);
      
  });    
    
    this.userAuth.getAdminId(this.id).subscribe((data: adminProfile) => {
      this.category = data.category;
    });
    this.userServiceAuth.getItems(this.id).subscribe((res: items[]) => {
      this.item = res;
    });
  }

  ngOnInit(): void {}
}
