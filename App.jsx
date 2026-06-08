import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeather = () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    let data;

    switch (city.toLowerCase()) {
      case "hyderabad":
        data = {
          temperature: 32,
          humidity: 65,
          condition: "Sunny ☀️",
          history: [
            { day: "Monday", temp: 30 },
            { day: "Tuesday", temp: 31 },
            { day: "Wednesday", temp: 32 },
            { day: "Thursday", temp: 33 },
            { day: "Friday", temp: 32 },
          ],
        };
        break;

      case "warangal":
        data = {
          temperature: 29,
          humidity: 72,
          condition: "Cloudy ☁️",
          history: [
            { day: "Monday", temp: 27 },
            { day: "Tuesday", temp: 28 },
            { day: "Wednesday", temp: 29 },
            { day: "Thursday", temp: 30 },
            { day: "Friday", temp: 29 },
          ],
        };
        break;

      case "delhi":
        data = {
          temperature: 38,
          humidity: 40,
          condition: "Hot 🔥",
          history: [
            { day: "Monday", temp: 36 },
            { day: "Tuesday", temp: 37 },
            { day: "Wednesday", temp: 38 },
            { day: "Thursday", temp: 39 },
            { day: "Friday", temp: 38 },
          ],
        };
        break;

      case "mumbai":
        data = {
          temperature: 31,
          humidity: 80,
          condition: "Humid 🌦️",
          history: [
            { day: "Monday", temp: 29 },
            { day: "Tuesday", temp: 30 },
            { day: "Wednesday", temp: 31 },
            { day: "Thursday", temp: 32 },
            { day: "Friday", temp: 31 },
          ],
        };
        break;

      default:
        data = {
          temperature: 30,
          humidity: 60,
          condition: "Normal 🌤️",
          history: [
            { day: "Monday", temp: 28 },
            { day: "Tuesday", temp: 29 },
            { day: "Wednesday", temp: 30 },
            { day: "Thursday", temp: 31 },
            { day: "Friday", temp: 30 },
          ],
        };
    }

    const avgTemp =
      data.history.reduce((sum, item) => sum + item.temp, 0) /
      data.history.length;

    data.prediction = Math.round(avgTemp + 1);

    data.trend =
      data.history[data.history.length - 1].temp >
      data.history[0].temp
        ? "📈 Rising"
        : "📊 Stable";

    setWeather(data);
    setSearchHistory((prev) => [...prev, city]);
  };

  const clearData = () => {
    setCity("");
    setWeather(null);
  };

  const getTemperatureLevel = () => {
    if (!weather) return "";

    if (weather.temperature >= 35) {
      return "🔥 High";
    } else if (weather.temperature >= 30) {
      return "🌤 Medium";
    } else {
      return "❄️ Low";
    }
  };

  const getWeatherTip = () => {
    if (!weather) return "";

    if (weather.temperature >= 35) {
      return "🥤 Stay hydrated and avoid direct sunlight.";
    }

    if (weather.condition.includes("Cloudy")) {
      return "☂️ Carry an umbrella. Weather may change suddenly.";
    }

    return "🌤 Enjoy your day. Weather conditions are comfortable.";
  };

  return (
    <div className="container">
      <h1>🌦 Weather Data Analysis & Prediction</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>
          Get Weather
        </button>

        <button
          onClick={clearData}
          style={{
            marginLeft: "10px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Clear
        </button>
      </div>

      {weather && (
        <>
          <div className="card">
            <h2>{city.toUpperCase()}</h2>

            <p>📅 {currentTime.toLocaleDateString()}</p>

            <p>
              📆{" "}
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>

            <p>⏰ {currentTime.toLocaleTimeString()}</p>

            <p>
              🌡 Temperature:
              <strong> {weather.temperature}°C</strong>
            </p>

            <p>
              🌈 Temperature Level:
              <strong> {getTemperatureLevel()}</strong>
            </p>

            <p>
              💧 Humidity:
              <strong> {weather.humidity}%</strong>
            </p>

            <p>
              ☁ Condition:
              <strong> {weather.condition}</strong>
            </p>

            <p>
              📈 Weather Trend:
              <strong> {weather.trend}</strong>
            </p>
            <p>
  📈 Highest Temperature:
  <strong>
    {Math.max(...weather.history.map((item) => item.temp))}°C
  </strong>
</p>

<p>
  📉 Lowest Temperature:
  <strong>
    {Math.min(...weather.history.map((item) => item.temp))}°C
  </strong>
</p>

<p>
  📊 Average Temperature:
  <strong>
    {(
      weather.history.reduce((sum, item) => sum + item.temp, 0) /
      weather.history.length
    ).toFixed(1)}
    °C
  </strong>
  </p>

            <p>
              🔮 Predicted Temperature:
              <strong> {weather.prediction}°C</strong>
            </p>

            <p>
              💡 <strong>Weather Tip:</strong>
            </p>

            <p>{getWeatherTip()}</p>
          </div>

          <h2>📊 Temperature History</h2>

          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Temperature (°C)</th>
              </tr>
            </thead>

            <tbody>
              {weather.history.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {searchHistory.length > 0 && (
        <div className="card">
          <h2>🔍 Recent Searches</h2>

          <h3>📌 Total Searches: {searchHistory.length}</h3>

          <ul>
            {searchHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;