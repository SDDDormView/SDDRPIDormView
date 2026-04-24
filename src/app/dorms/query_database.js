import { createClient } from "../utils/supabase/client";
import { TranslateResponse } from "./TranslateResponse.js";

// List of filters
const FILTER_COLUMN_MAP = {
	years: "Year",
	nearest_dining_hall: "Nearest Dining",
	building_styles: "Building Type",
	num_floors: "Floors",
	num_student_staff: "Staff",
	num_residents: "Occupants",
	gender_inclusive: "GI Housing",
	mattress_size: "Mattress size",
	air_conditioning: "A/C",
	carpet: "Carpet",
	ethernet: "Ethernet",
	kitchen: "Kitchen",
	restrooms: "Restrooms",
	single_cost: "Single cost", // how to implement TO DO
	double_cost: "Double cost",
	triple_cost: "Triple cost",
	room_sizes: null, // since prices can be null used to determine singles double triples: FIX
};

const YEAR_CODE_MAP = {
	Freshman: "F",
	Sophomore: "S",
	// fix this junior senor co term naming WRONG COLUMN DATA
	"Junior, Senior, Co-term": "U",
};

const BUILDING_TYPE_MAP = {
	// Different from room type fix
	Suite: "Suite",
	Traditional: "Traditional",
	Apartment: "Apartment",
	Suite_Traditional: "Suite/Traditional",
}

const RESTROOMS_MAP = {
	// Do we need map for Restroom as filter?
	Room: "R",
	Floor: "F",
	Room_Floor: "RF",
}

const MATTRESS_SIZE_MAP = {
	// idk if we need mattress size filter
}

const NEAREST_DINING_MAP = {
	// fixing DINING naming for blitman and RSDH
	Barh: "BARH",
	Commons: "Commons",
	Blitman: "Blitman",
	Rsdh: "RSDH",
}

const EXACT_MATCH_FILTERS = new Set([
	// attribute filters not dorm stuff like years
	// split? idk
	"air_conditioning",
	"carpet",
	"ethernet",
	"kitchen",
	"gender_inclusive",
	"num_floors",
	"num_student_staff",
	"num_residents",
	"mattress_size",
	"nearest_dining_hall",
	"building_styles",
	"restrooms",
]);



export class QueryDatabase {
	constructor() {
		this.supabase = createClient();
		this.translator = new TranslateResponse();
	}

	async query_database(filter_values = {}) {
		// Connect to db
		let query = this.supabase.from("Dorms").select("*");

		// Apply filters [filter, value]
		for (const [filterKey, filterValue] of Object.entries(filter_values)) {

			// Check for empty filter value
			if (filterValue === null || filterValue === undefined || filterValue === "") {
				continue;
			}

			if (filterKey === "room_sizes") {
				const sizes = Array.isArray(filterValue) ? filterValue : [filterValue];

				const conditions = sizes.map((size) => {
					switch (size) {
						case "Single": return '"Single cost".not.is.null';
						case "Double": return '"Double cost".not.is.null';
						case "Triple": return '"Triple cost".not.is.null';
						default: return null;
					}
				}).filter(Boolean);

				if (conditions.length > 0) {
					query = query.or(conditions.join(","));
				}
				continue;
			}

			// Map filter key to database column
			const column = FILTER_COLUMN_MAP[filterKey];
			if (column === undefined) {
				console.warn(`Unknown filter key: "${filterKey}" — skipping.`);
				continue;
			} else if (column === null) {
				// test null price
				console.warn('TESTING THIS IS NULL? Check if this is supposed to happen');
				continue;
			}

			// Current filters testing years and building styles
			// TO DO: Scale for adding more filters with drop down menu
			// No hard code filter keys
			if (filterKey === "years") {
				const code = YEAR_CODE_MAP[filterValue] ?? filterValue;
				query = query.eq(column, code);
				continue;
			}

			if (filterKey === "building_styles") {
				const selected = Array.isArray(filterValue) ? filterValue : [filterValue];

				// For each selected type, the dorm's building style must contain it
				// Suite + Traditional match "Suite/Traditional"
				// selecting just Suite matches "Suite" and "Suite/Traditional"
				// TO DO: Change this system to hold an array of building styles
				selected.forEach((type) => {
					query = query.ilike(column, `%${type}%`);
				});

				continue;
			}

			// bug fix /?
			if (filterKey === "air_conditioning") {
				query = query.filter('"A/C"', 'eq', filterValue);
				continue;
			}

			// Exact match filters
			if (EXACT_MATCH_FILTERS.has(filterKey)) {
				query = query.eq(column, filterValue);
				continue;
			}

			// Range filter: { min, max } for pricing dorms idk if it works in theory
			// TO DO check if input is int2 before using min max
			// if (
			// 	typeof filterValue === "object" &&
			// 	!Array.isArray(filterValue) &&
			// 	("min" in filterValue || "max" in filterValue)
			// ) {
			// 	if (filterValue.min !== undefined && filterValue.min !== "") {
			// 	query = query.gte(column, filterValue.min);
			// 	}
			// 	if (filterValue.max !== undefined && filterValue.max !== "") {
			// 	query = query.lte(column, filterValue.max);
			// 	}
			// 	continue;
			// }

			query = query.eq(column, filterValue);
		}

		const { data, error } = await query;

		const db_response = error
			? { data: [], statusText: "ERROR", error: error.message }
			: { data: data, statusText: "OK" };

		return this.translator.translate_response(db_response);
	}
}