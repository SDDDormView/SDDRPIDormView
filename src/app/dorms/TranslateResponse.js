import {DormBuilding} from './DormBuilding.js';
import {DormRoomTypes} from './DormRoomTypes.js';

//any values hardcoded to null are either not in the database yet or never will be
export class TranslateResponse{

	translate_response(db_response){
		//final returnable list of dorm objects
		let dormlist = [];

		//pull the data from the db_response
		const iterable = db_response.data;
		//check for errors, return empty list if so
		if (db_response.statusText != "OK"){
			return [];
		}

		for (const obj of iterable){
			//declare DormBuilding objects and maps requires to populate
			let currDorm = new DormBuilding();
			let curr_attmap = new Map();
			let curr_furnmap = new Map();
			let curr_amenmap = new Map();

			//dorm name
			currDorm.set_dorm_name(obj['Dorm']);

			//populate attribute map
			//years array component
			let years = []
			if (obj['years'] === "F"){
				years.push("Freshman");
			} else if (obj['years'] === "S"){
				years.push("Sophomore");
			} else {
				years.push("Junior, Senior, Co-term");
			}
			curr_attmap.set('years', years);
			//DormRoomTypes objects array component
			let room_types = [];
			if (obj['Single cost'] != null){
				let dorm_rt = new DormRoomTypes();
				dorm_rt.set_dorm_name(obj['Dorm']);
				let rt_attmap = new Map();
				rt_attmap.set('room_type', 'Single');
				rt_attmap.set('yearly_price', obj['Single cost']);
				rt_attmap.set('room_size', null);
				dorm_rt.set_attributes(rt_attmap);
				room_types.push(dorm_rt);
			}
			if (obj['Double cost'] != null){
				let dorm_rt = new DormRoomTypes();
				dorm_rt.set_dorm_name(obj['Dorm']);
				let rt_attmap = new Map();
				rt_attmap.set('room_type', 'Double');
				rt_attmap.set('yearly_price', obj['Double cost']);
				rt_attmap.set('room_size', null);
				dorm_rt.set_attributes(rt_attmap);
				room_types.push(dorm_rt);
			}
			if (obj['Triple cost'] != null){
				let dorm_rt = new DormRoomTypes();
				dorm_rt.set_dorm_name(obj['Dorm']);
				let rt_attmap = new Map();
				rt_attmap.set('room_type', 'Triple');
				rt_attmap.set('yearly_price', obj['Triple cost']);
				rt_attmap.set('room_size', null);
				dorm_rt.set_attributes(rt_attmap);
				room_types.push(dorm_rt);
			}
			curr_attmap.set('room_types', room_types);
			curr_attmap.set('nearest_dining_hall', obj['Nearest Dining']);
			curr_attmap.set('dining_hall_distance', null);
			curr_attmap.set('location', null);
			curr_attmap.set('building_styles', [obj['Building Type']]);
			curr_attmap.set('num_floors', obj['Floors']);
			curr_attmap.set('num_student_staff', obj['Staff']);
			curr_attmap.set('num_residents', obj['Occupants']);
			curr_attmap.set('co_ed_building', null);
			curr_attmap.set('gender_inclusive', obj['GI Housing']);
			currDorm.set_attributes(curr_attmap);
			
			//populate furniture map
			curr_furnmap.set('wardrobe', null);
			curr_furnmap.set('closet', null);
			curr_furnmap.set('bunkable_bed', null);
			curr_furnmap.set('mattress_size', obj['Mattress size']);
			curr_furnmap.set('underbed_height', null);
			curr_furnmap.set('desk_and_chair', null);
			curr_furnmap.set('bookcase', null);
			curr_furnmap.set('dresser', null);
			currDorm.set_furniture(curr_furnmap);

			//populate amentities map
			if (obj['Restrooms'] === 'R'){
				curr_amenmap.set('on_floor_restrooms', false);
				curr_amenmap.set('in_room_restrooms', true);
			} else if (obj['Restrooms'] == 'F'){
				curr_amenmap.set('on_floor_restrooms', true);
				curr_amenmap.set('in_room_restrooms', false);
			} else {
				curr_amenmap.set('on_floor_restrooms', true);
				curr_amenmap.set('in_room_restrooms', true);
			}
			curr_amenmap.set('restroom_cleaning', null);
			curr_amenmap.set('cleaning_schedule', null);
			curr_amenmap.set('gender_neutral_restroom', null);
			curr_amenmap.set('air_conditioning', obj['A/C']);
			curr_amenmap.set('blinds', null);
			curr_amenmap.set('lounge', null);
			curr_amenmap.set('cable_tv', null);
			curr_amenmap.set('card_access', null);
			curr_amenmap.set('carpet', obj['Carpet']);
			curr_amenmap.set('classroom', null);
			curr_amenmap.set('elevator', null);
			curr_amenmap.set('ethernet', obj['Ethernet']);
			curr_amenmap.set('indoor_bike_storage', null);
			curr_amenmap.set('kitchen', obj['Kitchen']);
			curr_amenmap.set('laundry', null);
			curr_amenmap.set('printer', null);
			curr_amenmap.set('study_rooms', null);
			curr_amenmap.set('wifi', null);
			currDorm.set_amenities(curr_amenmap);

			//add dorm to list
			dormlist.push(currDorm);
		}

		return dormlist;
	}

}