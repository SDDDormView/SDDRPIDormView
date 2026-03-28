import {DormBuilding} from './DormBuilding.js';
import {DormRoomTypes} from './DormRoomTypes.js';

export function translate_response(db_response){
	//final returnable list of dorm objects
	let dormlist = [];

	//pull the data from the db_response
	const iterable = db_response.data;
	//check for errors, return empty list if so
	if (data.statusText != "OK"){
		return [];
	}

	for (const obj of iterable){
		//declare DormBuilding objects and maps requires to populate
		let currDorm = new DormBuilding();
		let curr_attmap = new Map();
		let curr_furnmap = new Map();
		let curr_amenmap = new Map();

		//dorm name
		currDorm.set_dorm_name(obj.Dorm);

		//populate attribute map
		let years = []
		if (obj.years === "F"){
			years.push("Freshman");
		} else if (obj.years === "S"){
			years.push("Sophomore");
		} else {
			years.push("Junior, Senior, Co-term");
		}
		curr_attmap.set('years', years);
		
		
		//populate furniture map


		//populate amentities map


		//add dorm to list
		dormlist.push(currDorm);
	}

	return dormlist;
}