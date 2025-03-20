import React, { useEffect, useRef, useState } from "react";
import './Weather.css'
import search_icon from "../assets/search.svg"
import wind_icon from "../assets/wind.svg"
import humidity_icon from "../assets/cloud-fog-fill.svg"
import clear_icon from "../assets/cloud-lightning-rain.svg"

const WeatherApp = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherDate] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clear_icon,
    "02n": clear_icon,
    "03d": clear_icon,
    "03n": clear_icon,
    "04d": clear_icon,
    "09n": clear_icon,
    "09d": clear_icon,
    "04n": clear_icon,
    "10d": clear_icon,
    "10n": clear_icon,
    "13d": clear_icon,
    "13n": clear_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const apiKey = "f5f027d9f3c5eda1dc124481ac92faee";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherDate({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherDate(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">

            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : <></>}
    </div>
  );
};

export default WeatherApp;
