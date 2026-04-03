"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { DormBuilding } from "../DormBuilding"

export default function Home() {

  //set up state for filters
  const [filters, setFilters] = useState({
    year: [] as string[],
    roomType: [] as string[],
  });

  const handleCheckboxChange = (
    category: "year" | "roomType",
    value: string
  ) => {
    setFilters((prev) => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((v) => v !== value) // remove if unchecked
          : [...prev[category], value], // add if checked
      };
    });
  };

  //debug code: log the state of the filter
  useEffect(() => {
    console.log("Filters updated:", filters);
  }, [filters]);

  //set up building class to use in css
  const dorms = Array.from({ length: 4 }, () =>
    new DormBuilding()
  );

  dorms[0].set_dorm_name("Crockett");
  dorms[1].set_dorm_name("Quad");
  dorms[2].set_dorm_name("RHAPS A");
  dorms[3].set_dorm_name("Polytechnic");

  //temp code: metadata list to store tags for filter
  //in the future, i think we could modify dormbuilding
  //or have dorm building manager have some sort of function
  //to see if it meets the requirement of some filter
  const dormMetadata: Record<string, {
    year: string[];
    roomType: string[];
  }> = {
    "Crockett": {
      year: ["freshmen"],
      roomType: ["double", "triple"]
    },
    "Quad": {
      year: ["sophomore", "junior"],
      roomType: ["Single"]
    },
    "RHAPS A": {
      year: ["junior", "senior"],
      roomType: ["suite"]
    },
    "Polytechnic": {
      year: ["senior"],
      roomType: ["single", "suite"]
    }
  };

  //the filter itself
  //will need to be reworked if above restructuring implemented
  const filteredDorms = dorms.filter((dorm) => {
    const name = dorm.get_dorm_name();
    const meta = dormMetadata[name];

    //default case, add dorm if has no metadata
    if (!meta) return true;

    // --- YEAR MATCH ---
    const yearMatch =
      filters.year.length === 0 || // no filter applied
      filters.year.some((selectedYear) =>
        meta.year.includes(selectedYear)
      );

    // --- ROOM TYPE MATCH ---
    const roomMatch =
      filters.roomType.length === 0 ||
      filters.roomType.some((selectedRoom) =>
        meta.roomType.includes(selectedRoom)
      );

    return yearMatch && roomMatch;
  });

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
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("year", "freshmen")}
              />
              <p>Freshmen</p>
            </li>

            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("year", "sophomore")}
              />
              <p>Sophomore</p>
            </li>

            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("year", "junior")}
              />
              <p>Junior</p>
            </li>

            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("year", "senior")}
              />
              <p>Senior</p>
            </li>
          </ul>

          <div className="h-px bg-white my-4"></div>

          <p className="text-center text-lg my-4">Room Type</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("roomType", "single")}
              />
              <p>Single</p>
            </li>

            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("roomType", "double")}
              />
              <p>Double</p>
            </li>

            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("roomType", "triple")}
              />
              <p>Triple</p>
            </li>

            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={() => handleCheckboxChange("roomType", "suite")}
              />
              <p>Suite</p>
            </li>
          </ul>
        </div>

        {/* dorm list main body */}
        <div className="w-5/6 bg-gray-100 p-6 space-y-4">
          <h1 className="text-center text-4xl font-bold">
            Dorms
          </h1>

          {/* dorm list */}
          {/* works based on elements in dorms object list */}
          <ul className="space-y-4">
            {filteredDorms.map((dorm, index) => (
              <li key={index}>
                <Link href={`/dorms/${encodeURIComponent(dorm.get_dorm_name())}`}>
                  <div className="flex p-4 bg-gray-400 rounded space-x-4 hover:bg-gray-500">
                    {/* image element */}
                    <img src="/fieldrpi.jpg" alt="86 field" className="w-48 h-48 object-cover rounded" />

                    {/* text elements */}
                    <div className="flex flex-col w-full space-y-4">
                      <div className="text-lg font-bold underline">
                        Dorm: {dorm.get_dorm_name()}
                      </div>

                      {/* attributes and tags */}
                      <div className="grid grid-cols-3 gap-4">
                        <p>Nearest dining hall: Commons</p>
                        <p>A/C: No</p>
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