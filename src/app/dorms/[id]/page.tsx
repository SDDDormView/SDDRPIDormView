"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { TranslateResponse } from "../TranslateResponse.js";
import { DormBuilding } from "../../../lib/DormBuilding";
import { DormRoomTypes } from "../../../lib/DormRoomTypes";

//small helpers

//yes or no label
function Badge({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
      Yes
    </span>
  ) : (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
      No
    </span>
  );
}

//small stat cards under the image for residents, floors, year, GI housing
function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-medium text-gray-900 leading-tight">{value}</p>
    </div>
  );
}

//Details section
function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 text-right">{value}</span>
    </div>
  );
}

//Amenities section
function AmenityRow({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <Badge value={value} />
    </div>
  );
}

//room type color helper
function getRoomTypeStyles(type: string) {
  switch (type?.toLowerCase()) {
    case "single":
      return {
        card: "border-blue-200 bg-blue-50",
        text: "text-blue-800",
        sub: "text-blue-600",
      };
    case "double":
      return {
        card: "border-purple-200 bg-purple-50",
        text: "text-purple-800",
        sub: "text-purple-600",
      };
    case "triple":
      return {
        card: "border-orange-200 bg-orange-50",
        text: "text-orange-800",
        sub: "text-orange-600",
      };
    default:
      return {
        card: "border-gray-100 bg-gray-50",
        text: "text-gray-900",
        sub: "text-gray-400",
      };
  }
}

// main page component

export default function DormDetailPage() {
  //get dorm name from URL
  const { id } = useParams();
  const dormName = decodeURIComponent(id as string);

  //local state for dorm data + error handling
  const [dorm, setDorm] = useState<DormBuilding | null>(null);
  const [notFound, setNotFound] = useState(false);

  //fetch dorm data from Supabase when page loads
  useEffect(() => {
    const fetchDorm = async () => {
      const supabase = createClient();

      //Query: find dorm by name
      const { data, error } = await supabase
        .from("Dorms")
        .select("*")
        .eq("Dorm", dormName)
        .single();

      if (error || !data) {
        setNotFound(true);
        return;
      }

      //convert raw DB response into structured DormBuilding object
      const translator = new TranslateResponse();
      const results = translator.translate_response({ data: [data], statusText: "OK" });
      setDorm(results[0] ?? null);
    };

    fetchDorm();
  }, [dormName]);

  //loading/error states
  if (notFound) {
    return (
      <main className="flex flex-col min-h-screen">
        <div className="h-18 bg-black" />
        <div className="max-w-2xl mx-auto px-6 py-10">
          <Link href="/dorms" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6">
            ← Back to Dorms
          </Link>
          <p className="text-red-500 text-sm">Dorm not found.</p>
        </div>
      </main>
    );
  }

  if (!dorm) {
    return (
      <main className="flex flex-col min-h-screen">
        <div className="h-18 bg-black" />
        <div className="max-w-2xl mx-auto px-6 py-10">
          <p className="text-sm text-gray-400 animate-pulse">Loading…</p>
        </div>
      </main>
    );
  }

  //extract structured data from DormBuilding object
  const attrs     = dorm.get_attributes();
  const amenities = dorm.get_amenities();
  const furniture = dorm.get_furniture();
  const roomTypes = attrs?.get("room_types") ?? [];

  //format values to display
  const years          = attrs?.get("years")?.join(", ") ?? "—";
  const buildingStyles = attrs?.get("building_styles")?.join(", ") ?? "—";
  const diningHall     = attrs?.get("nearest_dining_hall") ?? "—";
  const numResidents   = attrs?.get("num_residents") ?? "—";
  const numFloors      = attrs?.get("num_floors") ?? "—";
  const isGI           = attrs?.get("gender_inclusive") ?? false;

  //render UI
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="h-18 bg-black" />

      <div className="max-w-2xl mx-auto w-full px-6 py-10 space-y-7">

        <Link href="/dorms" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to Dorms
        </Link>

        {/* header */}
        <div>
          <h1
            className="text-4xl font-semibold tracking-tight text-gray-900 mb-1"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {dorm.get_dorm_name()}
          </h1>
          <p className="text-sm text-gray-400">
            {[years, buildingStyles].filter(Boolean).join(" · ")}
          </p>
        </div>

        {/* image */}
        <img
          src={`/dorms/${dorm.get_dorm_name().replace(/\//g, "-")}.jpg`}
          alt={dorm.get_dorm_name()}
          className="w-full h-64 object-cover rounded-2xl"
          onError={(e) => { (e.target as HTMLImageElement).src = "/dorms/Crockett Hall.jpg"; }}
        />

        {/* stat cards */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Residents" value={numResidents} />
          <StatCard label="Floors"    value={numFloors} />
          <StatCard label="Year"      value={years} />
          <StatCard
            label="GI Housing"
            value={
              isGI ? (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mt-0.5">
                  ✓ Yes
                </span>
              ) : (
                <span className="text-gray-400 text-sm">No</span>
              )
            }
          />
        </div>

        {/* details */}
        <section className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Details
          </h2>
          <DetailRow label="Building type" value={buildingStyles} />
          <DetailRow label="Nearest dining hall" value={diningHall} />
          <DetailRow label="Residents" value={numResidents} />
          <DetailRow label="Floors" value={numFloors} />
          <DetailRow
            label="Gender-inclusive housing"
            value={<Badge value={isGI} />}
          />
        </section>

        {/* amenities */}
        <section className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Amenities
          </h2>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <AmenityRow label="Air conditioning" value={amenities?.get("air_conditioning") ?? false} />
              <AmenityRow label="Carpet" value={amenities?.get("carpet") ?? false} />
              <AmenityRow label="Ethernet" value={amenities?.get("ethernet") ?? false} />
              <AmenityRow label="Kitchen" value={amenities?.get("kitchen") ?? false} />
            </div>
            <div>
              <AmenityRow label="Elevator" value={amenities?.get("elevator") ?? false} />
              <AmenityRow label="In-room restroom" value={amenities?.get("in_room_restrooms") ?? false} />
              <AmenityRow label="Floor restroom" value={amenities?.get("on_floor_restrooms") ?? false} />
            </div>
          </div>
        </section>

        {/* furniture */}
        <section className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Furniture
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="8" width="20" height="10" rx="2"/>
                <path d="M2 12h20M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {furniture?.get("mattress_size") ?? "—"}
              </p>
              <p className="text-xs text-gray-400">Mattress size</p>
            </div>
          </div>
        </section>

        {/* room pricing */}
        {roomTypes.length > 0 && (
          <section className="border border-gray-100 rounded-2xl p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              Room Pricing
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {roomTypes.map((rt: DormRoomTypes, i: number) => {
                const rtAttrs = rt.get_attributes();
                const type = rtAttrs?.get("room_type");
                const styles = getRoomTypeStyles(type);

                return (
                  <div
                    key={i}
                    className={`rounded-xl p-4 text-center border transition-shadow ${styles.card}`}
                  >
                    <p className={`text-xs uppercase tracking-widest mb-1 ${styles.sub}`}>
                      {type}
                    </p>
                    <p className={`text-xl font-semibold ${styles.text}`}>
                      ${rtAttrs?.get("yearly_price")?.toLocaleString() ?? "—"}
                    </p>
                    <p className={`text-xs mt-0.5 ${styles.sub}`}>
                      per year
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}