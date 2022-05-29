// string miles_driven, string num_passengers
function get_car_carbon_emmisions(num_passengers, num_dist, dist_units) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer E3FH6T97E3MTF2GRC8B3GMHDF7HM");
    myHeaders.append("Content-Type", "application/json");

 

    // for car:
   
    var raw = '{"emission_factor":"passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na","parameters":{"passengers":' + num_passengers + '4,"distance":' + num_dist + ',"distance_unit":"' + dist_units +'"}}'
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };


    fetch("https://beta3.api.climatiq.io/estimate", requestOptions)
    .then(response => response.text())
    .then(result => show_car_carbon_emisions(result, num_passengers, num_dist, dist_units))
    .catch(error => console.log('error', error));

    // for bus:

    raw = '{"emission_factor":"passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na","parameters":{"passengers":' + num_passengers + '4,"distance":' + num_dist + ',"distance_unit":"' + dist_units +'"}}'
   
    requestOptions.body = raw;

    fetch("https://beta3.api.climatiq.io/estimate", requestOptions)
    .then(response => response.text())
    .then(result => show_bus_carbon_emisions(result, num_passengers, num_dist, dist_units))
    .catch(error => console.log('error', error));


  //  return ret_val;
}


function get_passengers() {
    var inputValue = document.getElementById('input_passengers').value; 
    if (inputValue == "" || isNaN(inputValue) || parseInt(inputValue) <= 0) {
        alert('Please enter a valid number of passengers.');
        return -1;
    } else {
        return parseFloat(inputValue);
    }
}

function get_dist() {
    var inputValue = document.getElementById('input_dist').value; 
    if (inputValue == "" || isNaN(inputValue) || parseInt(inputValue) <= 0) {
        alert('Please enter a valid distance travelled.');
        return -1;
    } else {
        return parseFloat(inputValue);
    } 
}

function calculate(){
    var num_passengers = get_passengers();
    var num_dist = get_dist();
    var dist_units = document.getElementById('input_dist_units').value;
    if (num_dist < 0 || num_passengers < 0) {
        return;
    }

    get_car_carbon_emmisions(num_passengers, num_dist, dist_units);
}

// input: String result_str
// output: dictionary
function show_car_carbon_emisions(result_str, num_passengers, num_dist, dist_units){

    var carbon = result_str.substring(8, result_str.indexOf(','));
    document.getElementById("result_car").innerHTML = "A " + num_dist.toString() + " " + dist_units +" trip with " 
                                                    + num_passengers.toString() + " passengers with an average car releases " +
                                                     carbon + " kilograms of carbon dioxide.";

    return;
}

// input: String result_str
// output: dictionary
function show_bus_carbon_emisions(result_str, num_passengers, num_dist, dist_units){

    var carbon = result_str.substring(8, result_str.indexOf(','));
    document.getElementById("result_bus").innerHTML = "A " + num_dist.toString() + " " + dist_units +" trip with " 
                                                    + num_passengers.toString() + " passengers with an average bus releases " +
                                                     carbon + " kilograms of carbon dioxide.";

    return;
}