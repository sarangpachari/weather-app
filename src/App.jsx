import { useState } from "react";
import "./App.css";
import weather_main_logo from "./assets/weather-main-logo.png";



function App() {
  const [weatherReport, setWeatherReport] = useState(null);
  const [error, setError] = useState(null);

  const currLocWeather = async () => {
    let lat = null;
    let lon = null;
    let x = document.getElementById("currLocError");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
    async function showPosition(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
        );
        if (!response.ok) {
          throw new Error(`Response Status : ${response.status}`);
        }
        const data = await response.json();
        setWeatherReport(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setWeatherReport(null);
        console.error(error.message);
      }
    }
  };

  const searchLoc = async () => {
    let locName = document.getElementById("searchValue").value;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Response Status : ${response.status}`);
      }
      const res = await response.json();
      setWeatherReport(res);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherReport(null);
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-sky-200 h-lvh flex flex-col justify-center items-center">
        <div className="p-8 bg-white flex md:flex-row flex-col md:justify-normal justify-center items-center">
          <div className="md:w-1/2 h-full flex flex-col justify-center items-center md:items-start md:ps-6">
            <h1 className="text-xl md:text-3xl text-sky-700">
              Welcome to{" "}
              <span className="text-orange-500 font-medium">Weather App</span>
            </h1>
            <h2 className="text-sm mt-2 text-sky-800 tracking-widest">
              Refresh Your Weather !
            </h2>
            <img
              width={"180px"}
              className="mt-6"
              src={weather_main_logo}
              alt=""
            />
          </div>
          <div
            id="viewWeather"
            className="w-1/2 h-full flex flex-col justify-center items-center"
          >
            <button
              onClick={currLocWeather}
              className="border w-max px-3 py-2 mt-5 bg-sky-600 text-white rounded"
            >
              Click Here for Current Location Weather
            </button>
            <p id="currLocError" className="text-red-500 text-center mt-3"></p>
            <hr className="border w-3/4 my-3" />
            <p>OR</p>
            <input
              id="searchValue"
              className="mt-3 border-b-2 text-center py-2 md:w-3/4 rounded text-sky-950"
              type="text"
              placeholder="Enter Location Name"
            />
            <input
              onClick={searchLoc}
              type="button"
              value="Search"
              className="border hover:scale-90 bg-sky-900 text-white px-3 py-1 mt-2 rounded-full"
            />
            <div className="text-sky-700 mt-5 flex md:flex-row flex-col gap-5 justify-evenly items-center w-full">
              {/* WEATHER Report */}
              <div className="">
                {/* <img src={currWeatherImage} alt="" /> */}
                {weatherReport && (
                  <>
                    <p className="text-3xl font-bold">
                      {parseInt(weatherReport.main.temp)} °C
                    </p>
                    <p className="font-bold text-xl">
                      {weatherReport.name}, {weatherReport.sys.country}
                    </p>
                  </>
                )}
                {error && <p className="text-red-500">{error}</p>}
              </div>
              {/* WEATHER REPORT */}
              <div className="text-center md:text-right">
                {weatherReport && (
                  <>
                    <p>
                      {weatherReport.rain
                        ? weatherReport.rain["1h"]
                        : "No rain"}
                    </p>
                    <p>{weatherReport.weather[0].description}</p>

                    <p>Humidity : {weatherReport.main.humidity} %</p>
                    <p>Wind Speed: {weatherReport.wind.speed} m/s</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="">
          <p className="pt-10 text-center px-5 text-sky-800 font-extralight">
            Copyright &copy; Designed and Developed by Sarang.P.Achari
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
