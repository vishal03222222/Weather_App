import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.svg";
import wind_icon from "../assets/wind.svg";
import humidity_icon from "../assets/cloud-fog-fill.svg";
import clear_icon from "../assets/cloud-lightning-rain.svg";

const WeatherApp = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const search = async (city) => {
    if (!city) {
      setError("Enter City Name");
      return;
    }
    try {
      const apiKey = "f5f027d9f3c5eda1dc124481ac92faee";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        country:data.sys.country,
      });
      setError("");
    } catch (error) {
      setWeatherData(null);
      setError("Error fetching weather data");
    }
  };

  const clearInput = () => {
    inputRef.current.value = "";
    setWeatherData(null);
    setError("");
  };

  useEffect(() => {
    search("");
  }, []);

  return (
    
    <div style={{ width: "320px", background: "linear-gradient(135deg, #4facfe,rgb(0, 38, 254))", borderRadius: "20px", padding: "20px", color: "white", textAlign: "center", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #4facfe,rgb(254, 178, 0))", animation: "fadeIn 2s ease-in-out" }}>
        <h1 style={{ marginBottom: "10px" }}>Weather App</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255, 255, 255, 0.2)", padding: "8px 12px", borderRadius: "20px" }}>
          <input ref={inputRef} type="text" placeholder="Enter City" style={{ width: "70%", background: "transparent", border: "none", color: "white", outline: "none" }} />
          <button onClick={() => search(inputRef.current.value)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <img src={search_icon} alt="search" width="20" />
          </button>
          <button onClick={clearInput} style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: "18px" }}>❌</button>
        </div>
        {weatherData ? (
          <>
            <h2 style={{ marginTop: "10px", fontSize: "24px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
  📍 {weatherData.location},{weatherData.country}
</h2>
           <div style={{ display: "flex",fontWeight: "bold", justifyContent: "center", alignItems: "center", gap: "10px" }}>
           <img src={clear_icon} alt="weather-icon" style={{ width: "50px" }} /> 
           <p >{weatherData.temperature}°C</p>
           </div>
           
          

            
            <div style={{ display: "flex",fontWeight: "bold", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <img src={humidity_icon} alt="humidity" style={{ width: "50px" }} />
              <p>{weatherData.humidity}% Humidity</p>
              

            </div>
            <div style={{ display: "flex",fontWeight: "bold", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "5px" }}>
              <img src={wind_icon} alt="wind" style={{ width: "50px" }} />
              <p>{weatherData.windSpeed} km/h Wind Speed</p>
            </div>
          </>
        ) : error ? (
          <h2 style={{ color: "red", marginTop: "10px" }}>{error}</h2>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherApp;
