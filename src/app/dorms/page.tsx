"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DormBuilding } from "../../lib/DormBuilding";
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

  // reusable filter checkbox component
  function FilterCheckbox({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all duration-150 hover:bg-gray-700 ${
          active ? "text-white" : "text-gray-400"
        }`}
      >
        {/* Custom checkbox box */}
        <span
          className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all duration-150 ${
            active
              ? "bg-white border-white"
              : "bg-transparent border-gray-500"
          }`}
        >
          {active && (
            <svg className="w-2.5 h-2.5 text-gray-900" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {label}
      </button>
    );
  }

    function Badge({ label }: { label: string }) {
    return (
      <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200">
        {label}
      </span>
    );
  }


  return (
    <main className="flex flex-col min-h-screen">
      {/* this goes behind the header so it doesn't look like whitespace */}
      <div className="h-18 bg-black flex">

      </div>

      <div className="flex flex-1">
        {/* sidebar, where the filter is located */}
        <div className="w-1/6 bg-gray-900 text-white flex flex-col p-5 border-r border-gray-700">
          <h2 className="text-center text-base font-bold tracking-wide uppercase text-gray-200 mb-6">
            Filter
          </h2>

          {/* list of filter options */}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Year
          </p>
          <ul className="space-y-1">
            {["Freshman", "Sophomore", "Junior, Senior, Co-term"].map((year) => (
              <li key={year}>
                <FilterCheckbox
                  label={year}
                  active={selectedYears.has(year)}
                  onClick={() => toggleYear(year)}
                />
              </li>
            ))}
          </ul>

          <div className="h-px bg-gray-700 my-5" />

          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Room Type
          </p>
          <ul className="space-y-1">
            {["Traditional", "Suite", "Apartment"].map((type) => (
              <li key={type}>
                <FilterCheckbox
                  label={type}
                  active={selectedRoomTypes.has(type)}
                  onClick={() => toggleRoomType(type)}
                />
              </li>
            ))}
          </ul>

          <div className="h-px bg-gray-700 my-5" />

          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Room Availability
          </p>
          <ul className="space-y-1">
            {["Single", "Double", "Triple"].map((type) => (
              <li key={type}>
                <FilterCheckbox
                  label={type}
                  active={selectedRoomAvailability.has(type)}
                  onClick={() => toggleRoomAvailability(type)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* dorm list main body */}
        <div className="w-5/6 p-8 space-y-6">

          {/* Page header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dorms</h1>
            <p className="text-sm text-gray-400 mt-1">
              {displayedDorms.length} {displayedDorms.length === 1 ? "result" : "results"}
            </p>
          </div>

          {/* Quick filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Quick filters:
            </span>
            {BOOL_TAGS.map((tag) => {
              const isActive = activeTags.has(tag.key);
              return (
                <button
                  key={tag.key}
                  onClick={() => (isActive ? removeTag(tag.key) : addTag(tag.key))}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                    isActive
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-300 hover:border-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          {/* Empty state */}
          {displayedDorms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-gray-400 text-lg font-medium">No dorms match your filters.</p>
              <p className="text-gray-300 text-sm mt-1">Try adjusting or clearing some filters.</p>
            </div>
          )}

          {/* Dorm cards */}
          <ul className="space-y-4">
            {displayedDorms.map((dorm, index) => (
              <li key={index}>
                <Link href={`/dorms/${encodeURIComponent(dorm.get_dorm_name())}`}>
                  <div className="flex bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 group">

                    {/* Image */}
                    <img
                      src="/fieldrpi.jpg"
                      alt={dorm.get_dorm_name()}
                      className="w-44 h-44 object-cover flex-shrink-0 group-hover:brightness-105 transition-all duration-200"
                    />

                    {/* Card content */}
                    <div className="flex flex-col justify-between p-5 w-full">
                      <div>
                        {/* Dorm name */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                          {dorm.get_dorm_name()}
                        </h2>

                        {/* Attributes grid */}
                        <div className="grid grid-cols-3 gap-x-6 gap-y-1.5 text-sm text-gray-600">
                          <p>
                            <span className="font-medium text-gray-800">Year: </span>
                            {dorm.get_attributes()?.get("years") ?? "—"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">Room Types: </span>
                            {dorm.get_attributes()?.get("building_styles") ?? "—"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">Dining Hall: </span>
                            {dorm.get_attributes()?.get("nearest_dining_hall") ?? "—"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">GI Housing: </span>
                            {dorm.get_attributes()?.get("gender_inclusive") ? "Yes" : "No"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">Carpet: </span>
                            {dorm.get_amenities()?.get("carpet") ? "Yes" : "No"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">A/C: </span>
                            {dorm.get_amenities()?.get("air_conditioning") ? "Yes" : "No"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">Elevator: </span>
                            {dorm.get_amenities()?.get("elevator") ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>

                      {/* Tag badges */}
                      <div className="flex gap-2 mt-4 flex-wrap">
                        <Badge label="Ethernet" />
                        <Badge label="Bike Rack" />
                        <Badge label="Elevator" />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}