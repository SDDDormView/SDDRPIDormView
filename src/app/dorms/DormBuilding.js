export class DormBuilding{
	
	//name of the dorm building as a string(Quad, Barton, E-complex, etc.)
	#dorm_name;
	//dictionary(Map) {attribute_name: attribute value, ...} of dorm info {string: variable type}
	//defined as data from "Room Types", "Dining", and "Community Information" from https://sll.rpi.edu/housing-comparison, as well as extra data fields that are added
	#attributes;
	//dictionary(Map) {attribute_name: attribute value, ...} of dorm furniture info
	//defined as data from "Furniture" from https://sll.rpi.edu/housing-comparison
	#furniture;
	//dictionary(Map) {attribute_name: attribute value, ...} of dorm amenity info
	//defined as data from "Restrooms" and "Amenities" from https://sll.rpi.edu/housing-comparison
	#amenities;

	constructor(){
		//designed to not initialize to anything, use setters to populate variables
	}

	//Getters: Returns class variables
	get_dorm_name(){
		return this.#dorm_name;
	}

	//get entire dictionary
	get_attributes(){
		return this.#attributes;
	}

	//get single attribute
	get_single_attributes(attribute_name){
		return this.#attributes;
	}

	get_furniture(){
		return this.#furniture ? structuredClone(this.#furniture) : null;
	}

	get_single_furniture(attribute_name){
		return this.#furniture ? structuredClone(this.#furniture.get(attribute_name)) : null;
	}

	get_amenities(){
		return this.#amenities ? structuredClone(this.#amenities) : null;
	}

	get_single_amenities(attribute_name){
		return this.#amenities ? structuredClone(this.#amenities.get(attribute_name)) : null;
	}

	//setters will ONLY be used to populate once
	set_dorm_name(name){
		if (typeof this.#dorm_name === 'undefined' && typeof name === 'string'){
			this.#dorm_name = name;
			return 0;
		}
		return 1;
	}

	set_attributes(att_map){
		if (typeof this.#attributes === 'undefined' && att_map instanceof Map){
			//check for correct keys
			if(this.check_keys(att_map, 'attributes')){
				this.#attributes = structuredClone(att_map);
				return 0;
			}
		}
		return 1;
	}

	set_furniture(att_map){
		if (typeof this.#furniture === 'undefined' && att_map instanceof Map){
			//check for correct keys
			if(this.check_keys(att_map, 'furniture')){
				this.#furniture = structuredClone(att_map);
				return 0;
			}
		}
		return 1;
	}

	set_amenities(att_map){
		if (typeof this.#amenities === 'undefined' && att_map instanceof Map){
			//check for correct keys
			if(this.check_keys(att_map, 'amenities')){
				this.#amenities = structuredClone(att_map);
				return 0;
			}
		}
		return 1;
	}

	//helper function for checking for the correct keys in a map class variable for this class
	check_keys(att_map, maptype){
		if (maptype === 'attributes') {
            const keys = [
                'years', 'room_types', 'nearest_dining_hall', 'dining_hall_distance', 
                'location', 'building_styles', 'num_floors', 
                'num_student_staff', 'num_residents', 'co_ed_building', 'gender_inclusive'
            ];
            return keys.every(key => att_map.has(key)) && att_map.size === keys.length;
        } else if (maptype === 'furniture'){
			if (att_map.has('wardrobe') && att_map.has('closet') && att_map.has('bunkable_bed')
				&& att_map.has('mattress_size') && att_map.has('underbed_height')
				&& att_map.has('desk_and_chair') && att_map.has('bookcase') && att_map.has('dresser')
				&& att_map.size === 8){
					return true;
			}
		} else if (maptype === 'amenities'){
			if (att_map.has('on_floor_restrooms') && att_map.has('in_room_restrooms')
				&& att_map.has('restroom_cleaning') && att_map.has('cleaning_schedule')
				&& att_map.has('gender_neutral_restroom') && att_map.has('air_conditioning')
				&& att_map.has('blinds') && att_map.has('lounge') && att_map.has('cable_tv')
				&& att_map.has('card_access') && att_map.has('carpet') && att_map.has('classroom')
				&& att_map.has('elevator') && att_map.has('ethernet') && att_map.has('indoor_bike_storage')
				&& att_map.has('kitchen') && att_map.has('laundry') && att_map.has('printer')
				&& att_map.has('study_rooms') && att_map.has('wifi')
				&& att_map.size === 20){
					return true;
			}
		}
		return false;
	}

	//returns an javascript object with display values for the UI
	//dorm page: dorm list
	dorm_list_UI_object(){
		//list object to string
		let years_string = ''
		for (let i = 0; i<this.#attributes.get('years').length; i++){
			if (i == this.#attributes.get('years').length-1){
				years_string += this.#attributes.get('years')[i];
			} else {
				years_string += this.#attributes.get('years')[i] + ', ';
			} 
		}
		//list object to string
		let room_types_string = ''
		for (let i = 0; i<this.#attributes.get('room_types').length; i++){
			if (i == this.#attributes.get('room_types').length-1){
				room_types_string += this.#attributes.get('room_types')[i].get_single_attributes('room_type') + `($${this.#attributes.get('room_types')[i].get_single_attributes('yearly_price')})`;
			} else {
				room_types_string += this.#attributes.get('room_types')[i].get_single_attributes('room_type') + `($${this.#attributes.get('room_types')[i].get_single_attributes('yearly_price')})` + ', ';
			} 
		}
		//list object to string
		let building_styles_string = ''
		for (let i = 0; i<this.#attributes.get('building_styles').length; i++){
			if (i == this.#attributes.get('building_styles').length-1){
				building_styles_string += this.#attributes.get('building_styles')[i];
			} else {
				building_styles_string += this.#attributes.get('building_styles')[i] + ', ';
			} 
		}
		return {
			dorm_name: this.#dorm_name,
			years: years_string,
			room_types_prices: room_types_string,
			building_styles: building_styles_string,
			nearest_dining: this.#attributes.get('nearest_dining_hall')
		};
	}

	//returns an javascript object with display values for the UI
	//dorm details page
	dorm_details_UI_object(){
		//list object to string
		let years_string = ''
		for (let i = 0; i<this.#attributes.get('years').length; i++){
			if (i == this.#attributes.get('years').length-1){
				years_string += this.#attributes.get('years')[i];
			} else {
				years_string += this.#attributes.get('years')[i] + ', ';
			} 
		}
		//list object to string
		let room_types_string = ''
		for (let i = 0; i<this.#attributes.get('room_types').length; i++){
			if (i == this.#attributes.get('room_types').length-1){
				room_types_string += this.#attributes.get('room_types')[i].get_single_attributes('room_type') + `($${this.#attributes.get('room_types')[i].get_single_attributes('yearly_price')})`;
			} else {
				room_types_string += this.#attributes.get('room_types')[i].get_single_attributes('room_type') + `($${this.#attributes.get('room_types')[i].get_single_attributes('yearly_price')})` + ', ';
			} 
		}
		//list object to string
		let building_styles_string = ''
		for (let i = 0; i<this.#attributes.get('building_styles').length; i++){
			if (i == this.#attributes.get('building_styles').length-1){
				building_styles_string += this.#attributes.get('building_styles')[i];
			} else {
				building_styles_string += this.#attributes.get('building_styles')[i] + ', ';
			} 
		}
		return {
			dorm_name: this.#dorm_name,
			years: years_string,
			room_types_prices: room_types_string,
			building_styles: building_styles_string,
			nearest_dining: this.#attributes.get('nearest_dining_hall'),
			dining_hall_distance: `${this.#attributes.get('dining_hall_distance')}`,
			num_floors: `${this.#attributes.get('num_floors')}`,
			num_staff: `${this.#attributes.get('num_student_staff')}`,
			num_residents: `${this.#attributes.get('num_residents')}`,
			co_ed: `${this.#attributes.get('co_ed_building')}`,
			gender_inclusive: `${this.#attributes.get('gender_inclusive')}`,
			wardrobe: `${this.#furniture.get('wardrobe')}`,
			closet: `${this.#furniture.get('closet')}`,
			bunkable_bed: `${this.#furniture.get('bunkable_bed')}`,
			mattress_size: `${this.#furniture.get('mattress_size')[0]}` + '" x'+ `${this.#furniture.get('mattress_size')[1]}` + '"',
			underbed_height: `${this.#furniture.get('underbed_height')}`+'"',
			desk_and_chair: `${this.#furniture.get('desk_and_chair')}`,
			bookcase: `${this.#furniture.get('bookcase')}`,
			dresser: `${this.#furniture.get('dresser')}`,
			on_floor_restrooms: `${this.#amenities.get('on_floor_restrooms')}`,
			in_room_restrooms: `${this.#amenities.get('in_room_restrooms')}`,
			restroom_cleaning: `${this.#amenities.get('restroom_cleaning')}`,
			cleaning_schedule: this.#amenities.get('cleaning_schedule'),
			gender_neutral_restroom: `${this.#amenities.get('gender_neutral_restroom')}`,
			air_conditioning: `${this.#amenities.get('air_conditioning')}`,
			blinds: `${this.#amenities.get('blinds')}`,
			lounge: `${this.#amenities.get('lounge')}`,
			cable_tv: `${this.#amenities.get('cable_tv')}`,
			card_access: `${this.#amenities.get('card_access')}`,
			carpet: `${this.#amenities.get('carpet')}`,
			classroom: `${this.#amenities.get('classroom')}`,
			elevator: `${this.#amenities.get('elevator')}`,
			ethernet: `${this.#amenities.get('ethernet')}`,
			indoor_bike_storage: `${this.#amenities.get('indoor_bike_storage')}`,
			kitchen: `${this.#amenities.get('kitchen')}`,
			laundry: `${this.#amenities.get('laundry')}`,
			printer: `${this.#amenities.get('printer')}`,
			study_rooms: `${this.#amenities.get('study_rooms')}`,
			wifi: `${this.#amenities.get('wifi')}`
		};
	}
}