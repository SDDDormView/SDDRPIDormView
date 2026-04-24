"use client";

import { use } from "react";
import Link from "next/link";

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  let dorms = [];
  try {
    //get the dorm list, handle errors
    dorms = JSON.parse(decodeURIComponent(id));
  } catch (e) {
    console.error("Failed to parse dorm results", e);
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-700 mb-8">Your Dorm Matches</h1>

        {dorms.length > 0 ? (
          <div className="grid gap-6">
            {dorms.map((dorm: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
                <h2 className="text-xl font-bold text-gray-900">{dorm.dorm_name}</h2>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <p><strong>Available for:</strong> {dorm.years}</p>
                  <p><strong>Styles:</strong> {dorm.building_styles}</p>
                  <p className="col-span-2"><strong>Room Types:</strong> {dorm.room_types_prices}</p>
                  <p><strong>Closest Dining:</strong> {dorm.nearest_dining}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No dorms matched your specific criteria.</p>
            <Link href="/quiz" className="text-red-600 font-semibold mt-4 inline-block">
              Try the quiz again
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}