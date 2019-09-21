let key = "7727eb7a7ad3adf1d307938860eca01b"//"<<Replace it With your API Key>>" Don't have a key? Get it for free from openweathermap.org
var cityName = "";
var link = "";
var link_trend = "";
var flag_link = "";
var time = new Date().getHours();


var flag = 0;

function convert_unix(time){				// This will convert EPOCH time or Unix time into Human readable time
	var date = new Date(time*1000);
	var day = "0"+date.getDate();
	var mon = date.getMonth();
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var yr = date.getFullYear();
	var hours = date.getHours();
	var min = "0"+date.getMinutes();
	return day.substr(-2)+"-"+months[mon]+"-"+yr+", "+hours+":"+min.substr(-2);
}

//color code for temperature
function getColor(num){
	if(num<27)
		return "cool";
	else if(num>=27 && num<30)
		return "mild";
	else if(num>=30 && num<33)
		return "warm";
	else if(num>=33 && num<35)
		return "hot";
	else if(num>=35)
		return "vhot";
}

// Json Parsing

function parseJson(){
	cityName = document.getElementById('city').value;
	link = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&apikey="+key;  //API Request Link
	link_trend = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=metric&APPID="+key;
	// link_trend = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&APPID="+key;
	var request = new XMLHttpRequest();
	request.open('GET',link,true);

	request.onload = function(){
		var obj = JSON.parse(this.response); 
		if (request.status >= 200 && request.status < 400) {
			document.getElementById('parse1').style.visibility = 'visible';
			document.getElementById('nointernet').style.visibility = 'collapse'
			document.getElementById('blur-bg').style.visibility = 'visible';
			var lastupdate_unix = obj.dt;
			var lastupdate_human = convert_unix(lastupdate_unix);
			document.getElementById('last_update').style.visibility = 'visible';
			document.getElementById('last_update').innerHTML = "Last update on: "+lastupdate_human+" Local Time";

			var temp = Math.floor(obj.main.temp);
			var color = getColor(temp);
			document.getElementById('Temperature').style.visibility = "visible";
			document.getElementById('Temperature').className = color;

			// if(temp<27)
			// 	document.getElementById('Temperature').className = "cool";
			// else if(temp>=27 && temp<30)
			// 	document.getElementById('Temperature').className = "mild";
			// else if(temp>=30 && temp<33)
			// 	document.getElementById('Temperature').className = "warm";
			// else if(temp>=33 && temp<35)
			// 	document.getElementById('Temperature').className = "hot";
			// else if(temp>=35)
			// 	document.getElementById('Temperature').className = "vhot";

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
			else if(obj.weather[0].main == "Drizzle"){
				document.getElementById('image').src = "Resources/rainy-7.svg"	
			}
			else if(obj.weather[0].main == "Thunderstorm"){
				document.getElementById('image').src = "Resources/thunder.svg"		
			}
			

			document.getElementById('temp_h').style.visibility = 'visible';
			document.getElementById('temp_l').style.visibility = 'visible';
			document.getElementById('htemp').innerHTML = obj.main.temp_min+"°C";
			document.getElementById('ltemp').innerHTML = obj.main.temp_max+"°C";

			document.getElementById('wind-title').style.visibility = 'visible';
			document.getElementById('wind-img').style.visibility = 'visible';
			document.getElementById('wind').innerHTML = obj.wind.speed+" m/s";
			document.getElementById('wind-img').style.transform = "rotate("+(obj.wind.deg-45)+"deg)";


			var unix_time_sunrise = obj.sys.sunrise; //- obj.timezone;
			var human_time_sunrise = convert_unix(unix_time_sunrise);
			var unix_time_sunset = obj.sys.sunset; //- obj.timezone;
			var human_time_sunset = convert_unix(unix_time_sunset);
			document.getElementById('sunrise').style.visibility = 'visible';
			document.getElementById('sunset').style.visibility = 'visible';
			document.getElementById('sr').innerHTML = human_time_sunrise+" hrs Local Time";
			document.getElementById('ss').innerHTML = human_time_sunset+" hrs Local Time";
		}
		else{
			document.getElementById('nointernet').innerHTML = "The city doesn't exist! Kindly check";
			document.getElementById('blur-bg').style.visibility = 'invisible';
		}
	}
	request.send();
	parseJson2();
	return;
}

function parseJson2(){
	console.log("function called"+cityName);
	cityName = document.getElementById('city').value;
	link_trend = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=metric&APPID="+key;
	// console.log(link_trend);
	var request1 = new XMLHttpRequest();
	request1.open('GET',link_trend,true);

	request1.onload = function(){
		var obj = JSON.parse(this.response); 
		var lst = obj.list;
		if (request1.status >= 200 && request1.status < 400) {
			console.log(link_trend);
			console.log(obj.city.name);
			for(var i=0;i<lst.length;i++){
				// document.getElementById("forecast").innerHTML += convert_unix(obj.list[i].dt)+" &ensp; "+obj.list[i].main.temp+"<br>";
				console.log(convert_unix(obj.list[i].dt)+" : "+obj.list[i].main.temp);
			}
			document.getElementById("temp1").innerHTML = obj.list[0].main.temp;
			document.getElementById("temp2").innerHTML = obj.list[1].main.temp;
			document.getElementById("temp3").innerHTML = obj.list[2].main.temp;
			document.getElementById("temp4").innerHTML = obj.list[3].main.temp;
			document.getElementById("temp5").innerHTML = obj.list[4].main.temp;
			document.getElementById("temp6").innerHTML = obj.list[5].main.temp;
			document.getElementById("temp7").innerHTML = obj.list[6].main.temp;
			document.getElementById("temp8").innerHTML = obj.list[7].main.temp;

			document.getElementById('temp1').className = getColor(obj.list[0].main.temp);
			document.getElementById('temp2').className = getColor(obj.list[1].main.temp);
			document.getElementById('temp3').className = getColor(obj.list[2].main.temp);
			document.getElementById('temp4').className = getColor(obj.list[3].main.temp);
			document.getElementById('temp5').className = getColor(obj.list[4].main.temp);
			document.getElementById('temp6').className = getColor(obj.list[5].main.temp);
			document.getElementById('temp7').className = getColor(obj.list[6].main.temp);
			document.getElementById('temp8').className = getColor(obj.list[7].main.temp);			

			document.getElementById("date1").innerHTML = convert_unix(obj.list[0].dt);
			document.getElementById("date2").innerHTML = convert_unix(obj.list[1].dt);
			document.getElementById("date3").innerHTML = convert_unix(obj.list[2].dt);
			document.getElementById("date4").innerHTML = convert_unix(obj.list[3].dt);
			document.getElementById("date5").innerHTML = convert_unix(obj.list[4].dt);
			document.getElementById("date6").innerHTML = convert_unix(obj.list[5].dt);
			document.getElementById("date7").innerHTML = convert_unix(obj.list[6].dt);
			document.getElementById("date8").innerHTML = convert_unix(obj.list[7].dt);
		}
		else{
			console.log("Problem in accessing JSON"+request.status);
		}
	}
	request1.send();
}