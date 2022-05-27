import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  addcategory: FormGroup;
  items_add: FormGroup;
  add!: newItem;
  name!: String;

  constructor(
    private http: HttpClient,
    private adminAuth: AdminAuthService,
    private adminServiceAuth: AdminServiceService
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
      this.name = data.restaurant;
    });
  }

  category_add() {
    const add = this.addcategory.value['add'];
    this.addcategory.reset();
    let categoryArray = this.category;
    categoryArray.push(add);
    const newaCategoryArray = { category: categoryArray };
    this.adminServiceAuth.category(newaCategoryArray);
  }

  // @ViewChild('fileInput') fileInput;

  addItem() {
    if (this.items_add.valid) {
      let formData = new FormData();
      // let fi = this.fileInput.nativeElement;
      // let fileToUpload = fi.files[0];
      // formData.append('food', fileToUpload);
      this.http
        .post('http://localhost:5000/admin/file/upload', formData)
        .subscribe((res: any) => {
          this.add = {
            name: this.items_add.value['name'],
            category: this.items_add.value['category'],
            origin: this.items_add.value['origin'],
            rating: 3,
            img: res.name,
            restaurant: this.name,
            price: this.items_add.value['price'],
            time: this.items_add.value['time'],
          };
          this.adminServiceAuth.addItems(this.add).subscribe((res) => {});
        });
    }
  }

  ngOnInit(): void {}
}
