export class DormRoomTypes extends DormBuilding{

	constructor(){
		super();
	}

	//override
	get_furniture(){
		return null;
	}

	//override
	get_single_furniture(attribute_name){
		return null;
	}

	//override
	get_amenities(){
		return null;
	}

	//override
	get_single_amenities(attribute_name){
		return null;
	}

	//override
	set_furniture(att_map){
		return 1;
	}

	//override
	set_amenities(att_map){
		return 1;
	}

	//override
	check_keys(att_map, maptype){
		if (maptype === 'attributes'){
			if (att_map.has('room_type') && att_map.has('yearly_price') && att_map.has('room_size') && att_map.size === 3){
					return true;
			}
		}
		return false;
	}

}