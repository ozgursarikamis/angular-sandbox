import { Component, inject } from '@angular/core';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.html',
  styleUrl: './review-list.css'
})
export class ReviewList {
  reviewService: ReviewService = inject(ReviewService);
  reviews = this.reviewService.reviewsResource.value;
  isLoading = this.reviewService.reviewsResource.isLoading;
}
