let key = "7727eb7a7ad3adf1d307938860eca01b"
var cityName = "";
var link = "";
var flag_link = "";
var time = new Date().getHours();
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
			document.getElementById('Climate').innerHTML = "Weather: "+obj.weather[0].main;
			document.getElementById('City').innerHTML = obj.name;
			var country = obj.sys.country;
			flag_link = "https://www.countryflags.io/"+country+"/shiny/64.png";
			document.getElementById('flag').src = flag_link;


			// document.getElementById('City1').innerHTML = obj.sys.country;
			if(obj.weather[0].main == "Haze"){
				if(time<18 && time>6)
					document.getElementById('image').src = "Resources/haze.png"
				else
					document.getElementById('image').src = "Resources/haze_night.png"
			}
			else if(obj.weather[0].main == "Clouds"){
				document.getElementById('image').src = "Resources/cloud.png"	
			}
			else if(obj.weather[0].main == "Rain"){
				document.getElementById('image').src = "Resources/rainy.png"	
			}
			else if(obj.weather[0].main == "Mist"){
				document.getElementById('image').src = "Resources/misty.png"	
			}
			else if(obj.weather[0].main == "Clear"){
				if(time<18 && time>6)
					document.getElementById('image').src = "Resources/sunrise.png"
				else
					document.getElementById('image').src = "Resources/sunset.png"
			}
			else if(obj.weather[0].main == "Smoke"){
				document.getElementById('image').src = "Resources/smoke.png"	
			}
		}
		else{
			document.getElementById('City').innerHTML = "The city doesn't exist! Kindly check";	
			document.getElementById('Temperature').innerHTML = "";
			document.getElementById('Climate').innerHTML = "";
			document.getElementById('flag').src = "";
			document.getElementById('image').src = "";
		}
	}

	request.send();
}