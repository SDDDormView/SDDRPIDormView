//abstract class
class Location{
    #lat;
    #long;
    #type;

    constructor(lat, long, type){
        this.#lat = lat;
        this.#long = long;
        this.#type = type;
    }

    get lat(){
        return this.#lat;
    }

    get long(){
        return this.#long;
    }

    get type(){
        return this.#type;
    }

    get_info(){
        throw new Error("Method 'get_info()' must be implemented.");
    }
}

class DormLocation extends Location{
    #dorm_name;

    constructor(lat, long, dorm_name){
        super(lat, long, "dorm");
        this.#dorm_name = dorm_name;
    }

    get_info(){
        return {
            lat: this.lat,
            long: this.long,
            type: this.type,
            dorm_name: this.#dorm_name
        };
    }
}

class DiningLocation extends Location{
    #dining_name;

    constructor(lat, long, dining_name){
        super(lat, long, "dining");
        this.#dining_name = dining_name;
    }

    get_info(){
        return {
            lat: this.lat,
            long: this.long,
            type: this.type,
            dining_name: this.#dining_name
        };
    }
}

class TransportLocation extends Location{
    #transport_name;

    constructor(lat, long, transport_name){
        super(lat, long, "transport");
        this.#transport_name = transport_name;
    }

    get_info(){
        return {
            lat: this.lat,
            long: this.long,
            type: this.type,
            transport_name: this.#transport_name
        };
    }
}

export { Location, DormLocation, DiningLocation, TransportLocation };
