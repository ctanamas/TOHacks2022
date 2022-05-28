// string miles_driven, string num_passengers
function getCarbonEmmisions(num_passengers, num_dist) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer E3FH6T97E3MTF2GRC8B3GMHDF7HM");
    myHeaders.append("Content-Type", "application/json");

    var raw = '{"emission_factor":"passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na","parameters":{"passengers":' + num_passengers + '4,"distance":' + num_dist + ',"distance_unit":"km"}}'

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

   // var ret_val;

    fetch("https://beta3.api.climatiq.io/estimate?passengers=4&distance=100&distance_unit=mi", requestOptions)
    .then(response => response.text())
   // .then(result => console.log(result))
  //  .then(result => ret_val = result)
    .then(result => show_carbon_emisions(result))
    .catch(error => console.log('error', error));
  //  return ret_val;
}


function get_passengers() {
    var inputValue = document.getElementById('input_passengers').value; 
    if (isNaN(inputValue) || parseInt(inputValue) <= 0) {
        alert('Please enter a valid number of passengers.');
        return -1;
    } else {
        return parseFloat(inputValue);
    }
}

function get_dist() {
    var inputValue = document.getElementById('input_dist').value; 
    if (isNaN(inputValue) || parseInt(inputValue) <= 0) {
        alert('Please enter a valid distance travelled.');
        return -1;
    } else {
        return parseFloat(inputValue);
    } 
}

function calculate(){
    var num_passengers = get_passengers();
    var num_dist = get_dist();

    if (num_dist < 0 || num_passengers < 0) {
        return;
    }

    getCarbonEmmisions(num_passengers, num_dist);
}

// input: String result_str
// output: dictionary
function show_carbon_emisions(result_str){
    // iffy fix for now
    alert(result_str.substring(8, result_str.indexOf(',')));
    
    return;

    // make this process the proper way and put in dict
    var dict = {};
    var key;
    var value;

    while(length(result_str) > 0) {
        
    
    }
}