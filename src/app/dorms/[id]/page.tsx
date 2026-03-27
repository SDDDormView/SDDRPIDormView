import { use } from "react";
import Link from "next/link";

export default function DormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const dorms: Record<string, { name: string; dining: string; ac: boolean; elevator: boolean; tags: string[] }> = {
    "crockett-hall": {
      name: "Crockett Hall",
      dining: "Commons",
      ac: false,
      elevator: false,
      tags: ["ethernet", "bike rack"],
    },
    "quad": {
      name: "Quad",
      dining: "Sage",
      ac: false,
      elevator: false,
      tags: ["ethernet", "bike rack"],
    },
  };

  const dorm = dorms[id];

  if (!dorm) return <p className="p-8 text-black">Dorm not found.</p>;

  return (
    <main className="min-h-screen bg-gray-100">
      {/* banner */}
      <div className="bg-black text-white pt-24 py-12 px-8">
        <Link href="/dorms" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Dorms
        </Link>
        <h1 className="text-5xl font-bold">{dorm.name}</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        {/* Info cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-500 text-sm uppercase font-semibold mb-1">Dining Hall</p>
            <p className="text-xl font-bold text-black">{dorm.dining}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-500 text-sm uppercase font-semibold mb-1">A/C</p>
            <p className={`text-xl font-bold ${dorm.ac ? "text-green-600" : "text-red-500"}`}>
              {dorm.ac ? "Yes" : "No"}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-500 text-sm uppercase font-semibold mb-1">Elevator</p>
            <p className={`text-xl font-bold ${dorm.elevator ? "text-green-600" : "text-red-500"}`}>
              {dorm.elevator ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-gray-500 text-sm uppercase font-semibold mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            {dorm.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}