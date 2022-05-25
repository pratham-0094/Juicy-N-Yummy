import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminProfile } from 'src/app/model/adminProfile';
import { userProfile } from 'src/app/model/userProfile';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-editadmin',
  templateUrl: './editadmin.component.html',
  styleUrls: ['./editadmin.component.css'],
})
export class EditadminComponent implements OnInit {
  profile: FormGroup;
  editprofile!: any;

  constructor(private adminAuth: AdminAuthService) {
    this.profile = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_no: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      openTime: new FormControl('', [Validators.required]),
      closeTime: new FormControl('', [Validators.required]),
      status: new FormControl(''),
    });
    this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
      if (data.status) {
        this.profile.setValue({
          name: data.name,
          email: data.email,
          phone_no: data.phone_no,
          openTime: data.duration[0],
          closeTime: data.duration[1],
          status: 'true',
        });
      } else {
        this.profile.setValue({
          name: data.name,
          email: data.email,
          phone_no: data.phone_no,
          openTime: data.duration[0],
          closeTime: data.duration[1],
          status: 'false',
        });
      }
    });
  }

  edit() {
    if (this.profile.valid) {
      let time = [
        this.profile.value['openTime'],
        this.profile.value['closeTime'],
      ];
      if (this.profile.value['status'] === 'true') {
        this.editprofile = {
          name: this.profile.value['name'],
          email: this.profile.value['email'],
          phone_no: this.profile.value['phone_no'],
          duration: time,
          status: true,
        };
      } else {
        this.editprofile = {
          name: this.profile.value['name'],
          email: this.profile.value['email'],
          phone_no: this.profile.value['phone_no'],
          duration: time,
          status: false,
        };
      }
      this.adminAuth.editAdminProfile(this.editprofile);
    }
  }

  ngOnInit(): void {}
}
