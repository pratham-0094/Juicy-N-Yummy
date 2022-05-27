import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { review } from 'src/app/model/review';
import { userProfile } from 'src/app/model/userProfile';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

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
  num: Number = 3;
  Auth!: String;
  reviewForm: FormGroup;
  name!: String;

  constructor(
    private itemService: ItemServiceService,
    private userAuth: UserAuthService,
    private router: Router,
    private location: Location
  ) {
    let routeUrl = location.path();
    this.id = routeUrl.slice(1, 25);
    this.reviewForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
    this.userAuth.getUser().subscribe((data: userProfile) => {
      this.Auth = data._id;
      this.name = data.name;
    });
    this.itemService.getReview(this.id).subscribe((res: review[]) => {
      this.reviews = res;
    });
  }

  click(e: number) {
    this.num = e;
  }

  addReview() {
    if (this.reviewForm.valid) {
      const review = {
        user: this.name,
        description: this.reviewForm.value['description'],
        rating: this.num,
      };
      this.reviewForm.reset();
      this.itemService.addReview(review, this.id).subscribe((res) => {
        console.log(res);
        this.itemService.getReview(this.id).subscribe((res: review[]) => {
          this.reviews = res;
        });
      });
      this.router.navigateByUrl(this.id + '/review');
    }
  }

  remove(id: String) {
    this.itemService.removeReview(id).subscribe((res) => {
      console.log(res);
      this.itemService.getReview(this.id).subscribe((res: review[]) => {
        this.reviews = res;
      });
    });
  }

  ngOnInit(): void {}
}
