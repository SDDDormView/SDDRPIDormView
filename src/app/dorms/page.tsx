"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DormBuilding } from "./DormBuilding"
import { QueryDatabase } from "./query_database";



export default function Home() {
  const db = useRef(new QueryDatabase());

  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<Set<string>>(new Set());
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

      console.log("Fetching with payload:", payload);
      const results = await db.current.query_database(payload);
      console.log("Results returned:", results);
      console.log("Results length:", results?.length);
      setDorms(results ?? []);
    };
    fetchDorms();
  }, [selectedYears, selectedRoomTypes]);

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

  // toggle ac
  /*
  function toggleAC(ac: string) { // should be bool
    setSelectedAC((prev) => {
    })
  }
  */



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
            <li className="flex items-center gap-2">
              <input type="checkbox" name="year" className="w-4 h-4"
                checked={selectedYears.has("Freshman")}
                onChange={() => toggleYear("Freshman")} />
              <p>Freshman</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" name="year" className="w-4 h-4"
                checked={selectedYears.has("Sophomore")}
                onChange={() => toggleYear("Sophomore")} />
              <p>Sophomore</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" name="year" className="w-4 h-4"
                checked={selectedYears.has("Junior, Senior, Co-term")}
                onChange={() => toggleYear("Junior, Senior, Co-term")} />
              <p>Junior, Senior, Co-term</p>
            </li>
          </ul>

          <div className="h-px bg-white my-4"></div>

          <p className="text-center text-lg my-4">Room Type</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4"
                checked={selectedRoomTypes.has("Traditional")}
                onChange={() => toggleRoomType("Traditional")} />
              <p>Traditional</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4"
                checked={selectedRoomTypes.has("Suite")}
                onChange={() => toggleRoomType("Suite")} />
              <p>Suite</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4"
                checked={selectedRoomTypes.has("Apartment")}
                onChange={() => toggleRoomType("Apartment")} />
              <p>Apartment</p>
            </li>
          </ul>
        </div>

        {/* dorm list main body */}
        <div className="w-5/6 bg-gray-100 p-6 space-y-4">
          <h1 className="text-center text-4xl font-bold">
            Dorms
          </h1>

          {displayedDorms.length === 0 && (
            <p className="text-center text-gray-500">No dorms found.</p>
          )}

          {/* dorm list */}
          <ul className="space-y-4">
            {displayedDorms.map((dorm, index) => (
              <li key={index}>
                <Link href="#">
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
                        {/* TO DO FIX: ROOM TYPE AND ROOM SIZE DIFFERENT */}
                        <p>Room Types: {dorm.get_attributes()?.get("building_styles") ?? "—"}</p>
                        <p>Nearest dining hall: {dorm.get_attributes()?.get("nearest_dining_hall") ?? "—"}</p>
                        <p>A/C: {dorm.get_amenities()?.get("air_conditioning") ? "Yes" : "No"}</p>
                        <p>Elevator: No</p>
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