'use client';
import React from 'react';
import ReviewCard, { ReviewForm, initialReviews, reviewClient } from './ReviewCard';

const ReviewPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>

      <ReviewForm/>

      <div className="mt-8 space-y-4">
        {initialReviews && initialReviews.map((review) => (
          <ReviewCard key={review.timestamp} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
