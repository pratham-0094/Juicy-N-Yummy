import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userProfile } from 'src/app/model/userProfile';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  profile: FormGroup;
  editprofile!: userProfile;

  constructor(private userAuth: UserAuthService) {
    this.profile = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_no: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
    });
    this.userAuth.getUser().subscribe((data: userProfile) => {
      this.profile.setValue({
        name: data.name,
        email: data.email,
        phone_no: data.phone_no,
      });
    });
  }

  edit() {
    if (this.profile.valid) {
      this.editprofile = {
        name: this.profile.value['name'],
        email: this.profile.value['email'],
        phone_no: this.profile.value['phone_no'],
      };
      this.userAuth.editUserProfile(this.editprofile);
    }
  }

  ngOnInit(): void {}
}
