let key = "7727eb7a7ad3adf1d307938860eca01b"
var cityName = "";
var link = "";
var link_trend = "";
var flag_link = "";
var time = new Date().getHours();


function parseJson(){
	cityName = document.getElementById('city').value;
	link = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&apikey="+key;

	var request = new XMLHttpRequest();
	request.open('GET',link,true);

	request.onload = function(){
		var obj = JSON.parse(this.response); 
		if (request.status >= 200 && request.status < 400) {
			var temp = Math.floor(obj.main.temp);
			document.getElementById('Temperature').style.visibility = "visible";
			if(temp<27)
				document.getElementById('Temperature').className = "cool";
			else if(temp>=27 && temp<30)
				document.getElementById('Temperature').className = "mild";
			else if(temp>=30 && temp<33)
				document.getElementById('Temperature').className = "warm";
			else if(temp>=33 && temp<35)
				document.getElementById('Temperature').className = "hot";
			else if(temp>=35)
				document.getElementById('Temperature').className = "vhot";

			document.getElementById('Temperature').innerHTML = obj.main.temp+"°C";
			document.getElementById('Climate').innerHTML = "Weather: "+obj.weather[0].description;
			document.getElementById('City').innerHTML = obj.name;
			var country = obj.sys.country;
			flag_link = "https://www.countryflags.io/"+country+"/shiny/64.png";
			document.getElementById('flag').style.visibility = "visible";
			document.getElementById('flag').src = flag_link;


			document.getElementById('image').style.visibility = "visible";
			if(obj.weather[0].main == "Haze"){
				if(time<18 && time>6)
					document.getElementById('image').src = "Resources/cloudy-day-1.svg"
				else
					document.getElementById('image').src = "Resources/cloudy-night-1.svg"
			}
			else if(obj.weather[0].main == "Clouds"){
				document.getElementById('image').src = "Resources/cloudy.svg"	
			}
			else if(obj.weather[0].main == "Rain"){
				document.getElementById('image').src = "Resources/rainy-6.svg"	
			}
			else if(obj.weather[0].main == "Mist"){
				document.getElementById('image').src = "Resources/snowy-4.svg"	
			}
			else if(obj.weather[0].main == "Clear"){
				if(time<18 && time>6)
					document.getElementById('image').src = "Resources/day.svg"
				else
					document.getElementById('image').src = "Resources/night.svg"
			}
			else if(obj.weather[0].main == "Smoke"){
				document.getElementById('image').src = "Resources/snowy-6.svg"	
			}

			document.getElementById('temp_h').style.visibility = 'visible';
			document.getElementById('temp_l').style.visibility = 'visible';
			document.getElementById('htemp').innerHTML = obj.main.temp_min+"°C";
			document.getElementById('ltemp').innerHTML = obj.main.temp_max+"°C";
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


