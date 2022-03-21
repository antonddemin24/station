import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectsService from "./services/projectsService.js";
import * as requestUtils from "./utils/requestUtils.js";


//creating class for location x, y for network_station and device
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    //finding distance between device and network station
    distance_to(x_other, y_other){
        return Math.sqrt(Math.pow((this.x - x_other), 2) + Math.pow((this.y - y_other), 2))
    }
};

//class for device
class Device{
    constructor(x, y) {
        this.location = new Point(x, y);
    }
    //function for finding best speed between device and network stations
    get_best_speed(network_stations) {
        let _thisx = this.location.x;
        let _thisy = this.location.y;
        let best_speed = 0;
        let result = 'No network station within reach for point ' + _thisx + ', ' + _thisy + '.';
        network_stations.forEach(function(item){
            let speed = item.get_speed(_thisx, _thisy);
            if (speed > best_speed) {
                best_speed = speed;
                result = 'Best network station for point ' + _thisx + ', ' + _thisy + ' is ' + item.location.x + ', ' + item.location.y + ' with speed ' + best_speed;
            }
        });
        return result;
    }
};

// class for network station
class Network_station{
    constructor(x, y, reach) {
        this.location = new Point(x, y);
        this.reach = reach;
    }

    // function for finding speed between device and network station
    get_speed(x_device, y_device) {
        let distance = this.location.distance_to(x_device, y_device);
        if (distance <= this.reach){
            return Math.pow((this.reach - distance), 2);
        } else {
            return 0;
        }
    }
};

//array for network stations
let network_stations = [];  

//array for devices
let devices = [];
    
//function for finding best network station for devices
const FindingBest = async () => {
    //cleaning arrays
    network_stations.length = 0;
    devices.length = 0;

    //taking data from database
    const data_network_stations = {
        stations: await projectsService.findAllNetworkStations()
    };
    
    //adding data from database to array
    data_network_stations.stations.forEach(function(item) {
        network_stations.push(new Network_station(item.x, item.y, item.reach));
    });
    
    //taking data from database
    const data_devices = {
        dev: await projectsService.findAllDevices()
    };
    
    //adding data from database to array
    data_devices.dev.forEach(function(item) {
        devices.push(new Device(item.x, item.y));
    });

    //adding results to array 
    let result = [];
    if (devices.length > 0 && network_stations.length > 0){
        devices.forEach(function(item){
            result.push([item.get_best_speed(network_stations)]);
    });
    } else {
        result.push(['There are no Network Stations or Devices']);
    };

    return result;
  };

  export { FindingBest };