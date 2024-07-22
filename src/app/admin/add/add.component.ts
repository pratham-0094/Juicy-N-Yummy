import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { adminProfile } from 'src/app/model/adminProfile';
import { newItem } from 'src/app/model/newItem';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  category!: String[];
  origin = ['Chinese', 'Continental', 'Italian', 'Mexican', 'South Indian'];
  addcategory: FormGroup;
  items_add: FormGroup;
  add!: newItem;
  name!: string;

  constructor(
    private http: HttpClient,
    private adminAuth: AdminAuthService,
    private adminServiceAuth: AdminServiceService,
    private router: Router
  ) {
    this.addcategory = new FormGroup({
      add: new FormControl(''),
    });
    this.items_add = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      origin: new FormControl('', Validators.required),
      food: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    });
    this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
      this.category = data.category;
      this.name = data.restaurant.toString();
    });
  }

  category_add() {
    const add = this.addcategory.value['add'];
    this.addcategory.reset();
    let categoryArray = this.category;
    categoryArray.push(add);
    const newCategoryArray = { category: categoryArray };
    this.adminServiceAuth.category(newCategoryArray);
  }

  @ViewChild('fileInput') fileInput: any;

  addItem() {
    if (this.items_add.valid) {
      let formData = new FormData();
      let fi = this.fileInput.nativeElement;
      let fileToUpload = fi.files[0];
      formData.append('img', fileToUpload, fileToUpload.name);
      formData.append('name', this.items_add.value['name']);
      formData.append('category', this.items_add.value['category']);
      formData.append('origin', this.items_add.value['origin']);
      formData.append('rating', "3");
      formData.append('restaurant', this.name);
      formData.append('price', this.items_add.value['price']);
      formData.append('time', this.items_add.value['time']);
      this.adminServiceAuth.addItems(formData).subscribe((res) => {
        this.router.navigateByUrl('/admin/dashboard/order');
      });
    }
  }

  ngOnInit(): void { }
}
