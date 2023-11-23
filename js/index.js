const apiKey = '9714be43eefbde4b474309ef05ad45a3';
const baseURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchCity = document.getElementById('searchCity');
const buttonSearch = document.getElementById('buttonSearch');
const weatherIcon = document.getElementById('weather-icon');
const error = document.getElementById('error');
const weather = document.getElementById('weather');

const checkWeather = async (city) => {
	const response = await fetch(`${baseURL}${city}&appid=${apiKey}`);
	const data = await response.json();
	
	const cityName = data.name;
	const temperature = data.main.temp;
	const humidity = data.main.humidity;
	const speedWind = data.wind.speed;
	
	console.log({data});
	
	document.getElementById('city').innerHTML = `${cityName}`;
	document.getElementById('temperature').innerHTML = `${Math.round(temperature)} °C`;
	document.getElementById('humidity').innerHTML = `${humidity}%`;
	document.getElementById('wind').innerHTML = `${speedWind} km/h`;
	
	if (data.weather[0].main === 'Clouds') {
		weatherIcon.src = 'images/clouds.png';
	}
	if (data.weather[0].main === 'Clear') {
		weatherIcon.src = 'images/clear.png';
	}
	if (data.weather[0].main === 'Rain') {
		weatherIcon.src = 'images/rain.png';
	}
	if (data.weather[0].main === 'Drizzle') {
		weatherIcon.src = 'images/drizzle.png';
	}
	if (data.weather[0].main === 'Mist') {
		weatherIcon.src = 'images/mist.png';
	}
	
	if (city) {
		weather.style.display = 'block';
	}
};

buttonSearch.addEventListener('click', (event) => {
	event.preventDefault();
	const city = searchCity.value;
	
	if (city) {
		checkWeather(city).then(response => console.log({response})).catch(() => {
			error.innerHTML = 'Ciudad no encontrada, ingrese una ciudad válida';
			weather.style.display = 'none';
		});
	}
	if (!city) {
		alert('Please enter a city');
	}
});