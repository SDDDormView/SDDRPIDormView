import React from "react";
import { useState } from "react";
import { Review, User } from "../../lib/Review.js";

// helper type for review data
type ReviewData = {
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const initialReviews: ReviewData[] = [
  {
    name: "Alice",
    rating: 5,
    comment: "Great product, highly recommend!",
    date: "2026-04-10",
  },
  {
    name: "Bob",
    rating: 4,
    comment: "Very solid, but could be improved.",
    date: "2026-04-12",
  },
];

type ReviewProps = {
  review: ReviewData;
};

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{review.name}</h2>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>

      <div className="mt-2 text-yellow-500">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      <p className="mt-2 text-gray-700">{review.comment}</p>
    </div>
  );
};

const ReviewForm: React.FC<{ dormName?: string }> = ({ dormName = "General" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Create User instance
      const user = new User(name, email);

      // Create Review instance
      const review = new Review(user, title, comment, rating);

      // Add review to database
      await review.addReview(dormName);

      // Show success message
      setMessage({ type: 'success', text: 'Review submitted successfully!' });

      // Reset form
      setName("");
      setEmail("");
      setTitle("");
      setRating(5);
      setComment("");
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to submit review'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Leave a Review</h2>

      {message && (
        <div
          className={`p-3 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <input
        type="text"
        placeholder="Your name"
        className="w-full border rounded p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Your email"
        className="w-full border rounded p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Review title"
        className="w-full border rounded p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        className="w-full border rounded p-2"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write your review..."
        className="w-full border rounded p-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export { ReviewForm, initialReviews };
export default ReviewCard;
