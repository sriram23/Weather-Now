let key = "7727eb7a7ad3adf1d307938860eca01b"
var cityName = "";
var link = "";
function parseJson(){
	cityName = document.getElementById('city').value;
	link = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&apikey="+key;
	console.log(link);

	var request = new XMLHttpRequest();
	request.open('GET',link,true);

	request.onload = function(){
		var obj = JSON.parse(this.response);

		if (request.status >= 200 && request.status < 400) {
			document.getElementById('Temperature').innerHTML = "Temperature: "+obj.main.temp+"°C";
			document.getElementById('Climate').innerHTML = "Climate: "+obj.weather[0].main;
			document.getElementById('City').innerHTML = obj.name;
		}
		else{
			document.getElementById('City').innerHTML = "The city doesn't exist! Kindly check";	
			document.getElementById('Temperature').innerHTML = "";
			document.getElementById('Climate').innerHTML = "";
		}
	}

	request.send();
}