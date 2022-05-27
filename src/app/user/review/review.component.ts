import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminProfile } from 'src/app/model/adminProfile';
import { review } from 'src/app/model/review';
import { AdminAuthService } from 'src/app/service/admin-auth.service';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  reviews!: review[];
  stars: number[] = [1, 2, 3, 4, 5];
  id!: String;
  image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTooPlWSljxJsQv2hyv2JgVd-Ozk0lA4WmV2A&usqp=CAU';

  num: number = 0;

  constructor(
    private adminServiceAuth: AdminServiceService,
    private adminAuth: AdminAuthService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    if (this.location.path() === '/admin/dashboard/review') {
      this.adminAuth.getAdmin().subscribe((data: adminProfile) => {
        this.id = data._id;
        this.adminServiceAuth.getReview(this.id).subscribe((res: review[]) => {
          this.reviews = res;
        });
      });
    } else {
      this.route.params.subscribe((params) => {
        this.id = params['id'];
        this.adminServiceAuth.getReview(this.id).subscribe((res: review[]) => {
          this.reviews = res;
        });
      });
    }
  }

  click(e: number) {
    this.num = e;
  }

  remove(id: String) {
    this.adminServiceAuth.removeReview(id).subscribe((res) => {
      console.log(res);
      this.adminServiceAuth.getReview(this.id).subscribe((res: review[]) => {
        this.reviews = res;
      });
    });
  }

  ngOnInit(): void {}
}
