"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DormBuilding } from "../../lib/DormBuilding"
import { QueryDatabase } from "./query_database";

const BOOL_TAGS = [
  { key: "gender_inclusive", label: "GI Housing" },
  { key: "air_conditioning", label: "A/C" },
  { key: "carpet", label: "Carpet" },
];



export default function Home() {
  const db = useRef(new QueryDatabase());

  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<Set<string>>(new Set());
  const [selectedRoomAvailability, setSelectedRoomAvailability] = useState<Set<string>>(new Set());

  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());


  const [dorms, setDorms] = useState<DormBuilding[]>([]);



  useEffect(() => {
    const fetchDorms = async () => {
      const payload: Record<string, unknown> = {};

      // Only send a year filter if exactly one is selected.
      // Multi-year is filtered client-side below.
      if (selectedYears.size === 1) {
        payload.years = [...selectedYears][0];
      }

      if (selectedRoomTypes.size > 0) {
        payload.building_styles = [...selectedRoomTypes];
      }

      if (selectedRoomAvailability.size > 0) {
          payload.room_sizes = [...selectedRoomAvailability];
      }

      for (const tagKey of activeTags) {
        payload[tagKey] = true;
      }

      // TO DO: REMOVE this is testing filters work
      console.log("Fetching with payload:", payload);
      const results = await db.current.query_database(payload);
      console.log("Results returned:", results);
      console.log("Results length:", results?.length);
      setDorms(results ?? []);
    };
    fetchDorms();
  }, [selectedYears, selectedRoomTypes, selectedRoomAvailability, activeTags]);

  // Multi year filter
  const yearFilteredDorms = selectedYears.size <= 1 ? dorms : dorms.filter((dorm) => {
    const dormYears: string[] = dorm.get_attributes()?.get("years") ?? [];
    return dormYears.some((y) => selectedYears.has(y));
  });

  // Room type filter 
  const displayedDorms = selectedRoomTypes.size === 0 ? yearFilteredDorms : yearFilteredDorms.filter((dorm) => {
    const buildingStyles: string[] = dorm.get_attributes()?.get("building_styles") ?? [];
    return [...selectedRoomTypes].every((selected) =>
      buildingStyles.some((style) => style.includes(selected))
    );
  });

  function toggleYear(year: string) {
    setSelectedYears((prev) => {
      if (prev.has(year)) {
        // Clicking the same one deselects it
        return new Set();
      } else {
        // Clicking a new one replaces the old selection
        return new Set([year]);
      }
    });
  }

  // messed up room type naming this was before, fix later
  function toggleRoomType(roomType: string) {
    setSelectedRoomTypes((prev) => {
      const next = new Set(prev);
      next.has(roomType) ? next.delete(roomType) : next.add(roomType);
      return next;
    });
  }

  // room type single double triple
  function toggleRoomAvailability(type: string) {
    setSelectedRoomAvailability((prev) => {
        const next = new Set(prev);
        next.has(type) ? next.delete(type) : next.add(type);
        return next;
    });
  }


  function removeTag(key: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }

  function addTag(key: string) {
    setActiveTags((prev) => new Set([...prev, key]));
  }



  return (
    <main className="flex flex-col min-h-screen">
      {/* this goes behind the header so it doesn't look like whitespace */}
      <div className="h-18 bg-black flex">

      </div>

      <div className="flex flex-1">
        {/* sidebar, where the filter is located */}
        <div className="w-1/6 bg-gray-800 text-white p-4 py-8">
          <h2 className="text-center text-xl font-bold mb-4">
            Filter Options
          </h2>

          {/* list of filter options */}
           <p className="text-center text-lg my-4">Year</p>
          <ul className="space-y-4">
            {["Freshman", "Sophomore", "Junior, Senior, Co-term"].map((year) => (
              <li key={year} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4"
                  checked={selectedYears.has(year)}
                  onChange={() => toggleYear(year)} />
                <p>{year}</p>
              </li>
            ))}
          </ul>

          <div className="h-px bg-white my-4"></div>

          <p className="text-center text-lg my-4">Room Type</p>
          <ul className="space-y-4">
            {["Traditional", "Suite", "Apartment"].map((type) => (
              <li key={type} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4"
                  checked={selectedRoomTypes.has(type)}
                  onChange={() => toggleRoomType(type)} />
                <p>{type}</p>
              </li>
            ))}
          </ul>

          <div className="h-px bg-white my-4"></div>

          <p className="text-center text-lg my-4">Room Availability</p>
          <ul className="space-y-4">
            {["Single", "Double", "Triple"].map((type) => (
              <li key={type} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4"
                  checked={selectedRoomAvailability.has(type)}
                  onChange={() => toggleRoomAvailability(type)} />
                <p>{type}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* dorm list main body */}
        <div className="w-5/6 bg-gray-100 p-6 space-y-4">
          <h1 className="text-center text-4xl font-bold">
            Dorms
          </h1>
          {/* Filter by tag bool TRUE TO DO: exclude filter */}
          <div className="flex items-center gap-1 bg-gray-200 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400 mr-1">Filters:</span>
            {BOOL_TAGS.map((tag, i) => {
              const isActive = activeTags.has(tag.key);
              return (
                <span key={tag.key} className="flex items-center gap-1">
                  <button
                    onClick={() => isActive ? removeTag(tag.key) : addTag(tag.key)}
                    className="text-sm px-1.5 py-0.5 rounded transition-colors"
                    style={{
                      fontWeight: isActive ? 500 : 400,
                      textDecoration: isActive ? "underline" : "none",
                      color: isActive ? "inherit" : "#9ca3af",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {tag.label}
                  </button>
                  {i < BOOL_TAGS.length - 1 && (
                    <span className="text-gray-300 text-sm select-none">·</span>
                  )}
                </span>
              );
            })}
          </div>

          {displayedDorms.length === 0 && (
            <p className="text-center text-gray-500">No dorms found.</p>
          )}

          {/* dorm list */}
          {/* works based on elements in dorms object list */}
          <ul className="space-y-4">
            {displayedDorms.map((dorm, index) => (
              <li key={index}>
                <Link href={`/dorms/${encodeURIComponent(dorm.get_dorm_name())}`}>
                  <div className="flex p-4 bg-gray-400 rounded space-x-4 hover:bg-gray-500">
                    {/* Image TO DO: store images in db? cost? store images in public folder grab from there? */}
                    <img src="/fieldrpi.jpg" alt="86 field" className="w-48 h-48 object-cover rounded" />

                    {/* Header */}
                    <div className="flex flex-col w-full space-y-4">
                      <div className="text-lg font-bold underline">
                        Dorm: {dorm.get_dorm_name()}
                      </div>

                      {/* Attributes per dorm */}
                      <div className="grid grid-cols-3 gap-4">
                        <p>Year: {dorm.get_attributes()?.get("years") ?? "—"}</p>
                        <p>Room Types: {dorm.get_attributes()?.get("building_styles") ?? "—"}</p>
                        <p>Nearest dining hall: {dorm.get_attributes()?.get("nearest_dining_hall") ?? "—"}</p>
                        <p>GI Housing: {dorm.get_attributes()?.get("gender_inclusive") ? "Yes" : "No"}</p>
                        <p>Carpet: {dorm.get_amenities()?.get("carpet") ? "Yes" : "No"}</p>
                        <p>A/C: {dorm.get_amenities()?.get("air_conditioning") ? "Yes" : "No"}</p>
                        <p>Elevator: {dorm.get_amenities()?.get("elevator") ? "Yes" : "No"}</p>
                      </div>

                      <p className="font-bold">Tags: ethernet, bike rack, elevator</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}