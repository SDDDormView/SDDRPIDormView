'use client';
import React from "react";
import { useState } from "react";
import { Review } from "../../lib/Review.js";
import { createClient } from "../utils/supabase/client";

// helper type for review data
type ReviewData = {
  author: string;
  rating: number;
  content: string;
  timestamp: string;
  dorm_name: string;
};

class reviewClient {
  private supabase: ReturnType<typeof createClient>;

  constructor() {
    this.supabase = createClient();
  }

  async addReview(dormName: string, review: any) {
    const { data, error } = await this.supabase
      .from("Reviews")
      .insert({
        dorm_name: review.dorm_name || dormName,
        author: review.author,
        rating: review.rating,
        content: review.content,
        timestamp: review.timestamp,
      });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async getReviewsByDormName(dormName: string) {
    const { data, error } = await this.supabase
      .from("Reviews")
      .select("*")
      .eq("dorm_name", dormName)
      .order("timestamp", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async getReviews() : Promise<ReviewData[]> {
    const { data, error } = await this.supabase
      .from("Reviews")
      .select("*")
      .order("timestamp", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

type ReviewProps = {
  review: ReviewData;
};

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{review.author}</h2>
        <span className="text-sm text-gray-500">{review.timestamp}</span>
        <h2 className="font-semibold">{review.dorm_name}</h2>
      </div>

      <div className="mt-2 text-yellow-500">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      <p className="mt-2 text-gray-700">{review.content}</p>
    </div>
  );
};

const ReviewForm: React.FC<{}> = () => {
  const [author, setAuthor] = useState("");
  const [dormName, setDormName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Create reviewClient instance
      const client = new reviewClient();

      // Create Review instance with dorm_name
      const review = new Review(author, content, rating, dormName);

      // Add review to database using reviewClient
      await review.addReview(client);

      // Show success message
      setMessage({ type: 'success', text: 'Review submitted successfully!' });

      // Reset form
      setAuthor("");
      setDormName("");
      setContent("");
      setRating(5);
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
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Dorm Name"
        className="w-full border rounded p-2"
        value={dormName}
        onChange={(e) => setDormName(e.target.value)}
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
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

export { ReviewForm, reviewClient };
export type { ReviewData };
export default ReviewCard;
