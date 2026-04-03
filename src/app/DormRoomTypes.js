export class DormRoomTypes{

	//name of the dorm building as a string(Quad, Barton, E-complex, etc.)
	#dorm_name;
	//dictionary(Map) {attribute_name: attribute value, ...} of dorm info {string: variable type}
	//defined as strictly room type, price, and size
	#attributes;

	constructor(){
		//designed to not initialize to anything, use setters to populate variables
	}

	//Getters: Returns class variables
	get_dorm_name(){
		return this.#dorm_name;
	}

	//get entire dictionary
	get_attributes(){
		return this.#attributes ? structuredClone(this.#attributes) : null;
	}

	//get single attribute
	get_single_attributes(attribute_name){
		return this.#attributes ? structuredClone(this.#attributes.get(attribute_name)) : null;
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

	check_keys(att_map, maptype){
		if (maptype === 'attributes'){
			if (att_map.has('room_type') && att_map.has('yearly_price') && att_map.has('room_size') && att_map.size === 3){
					return true;
			}
		}
		return false;
	}
}