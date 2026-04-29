'use client';
import React, { useEffect, useState } from 'react';
import ReviewCard, { ReviewForm, reviewClient } from './ReviewCard';
import type { ReviewData } from './ReviewCard';

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const client = new reviewClient();
        const data = await client.getReviews();
        setReviews(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-24">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>

      <ReviewForm/>

      <div className="mt-8 space-y-4">
        {loading && <p className="text-gray-500">Loading reviews...</p>}
        {error && <p className="text-red-500">Error loading reviews: {error}</p>}
        {!loading && reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
        {reviews && reviews.map((review) => (
          <ReviewCard key={review.timestamp} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
