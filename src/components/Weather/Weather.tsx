import React, {useState, useEffect, FC} from "react";
import axios from "axios";
import {API_KEY, WeatherService} from "../../services/WeatherServices";
import Alert from "../ui/Alert";
import WeatherForecast from "./WeatherForecast";
import WeatherSearch from "./WeatherSearch";
import "./Weather.css"
import type {IForecastDay, IWeatherData} from "../../interfaces";

const Weather: FC = () => {
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState<IForecastDay[]>([]);
    const [isCurrentPositionLoad, setIsCurrentPositionLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        type: 'd-none',
        message: ''
    });

    useEffect(() => {
        (async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    setLoading(true);
                    const {latitude, longitude} = position.coords;
                    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;

                    try {
                        const response = await axios.get(url);
                        setCity(response.data.location.name);
                        setWeatherData(response.data);
                        setIsCurrentPositionLoad(true);
                    } catch (error) {
                        setAlert({
                            type: 'alert-danger',
                            message: 'Not correct city'
                        });
                    } finally {
                        setLoading(false);
                    }
                });
            }
        })();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await WeatherService.getForecast(city);
            if (response) {
                setForecast(response.forecast.forecastday);
            }
        }

        isCurrentPositionLoad && fetchData();
    }, [isCurrentPositionLoad])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(decodeURIComponent(event.target.value));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setWeatherData(null);
        const [weather, forecast] = await Promise.all([WeatherService.getWeatherData(city), WeatherService.getForecast(city)]);

        if (weather && forecast) {
            setForecast(forecast.forecast.forecastday);
            setWeatherData(weather);
            setAlert({
                type: 'd-none',
                message: ''
            })
            setLoading(false);
        } else {
            setWeatherData(null);
            setAlert({
                type: 'alert-danger',
                message: 'Not correct city'
            });
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <WeatherSearch
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                city={city}
            />
            <Alert type={alert.type} message={alert.message}/>
            {weatherData && (
                <>
                    <div className="card mb-2 col-12 col-md-6">
                        <div className="card-body">
                            <h2 className="card-title">
                                Weather in {weatherData.location.name}, {weatherData.location.country}
                            </h2>
                            <p className="card-text">Temperature: <span
                                className="badge badge-primary">{weatherData.current.temp_c}°C</span></p>
                            <p className="card-text">Feels like: <span
                                className="badge badge-success">{weatherData.current.feelslike_c}°C</span></p>
                            <p className="card-text">Condition: <span
                                className="badge badge-info">{weatherData.current.condition.text}</span></p>
                        </div>
                    </div>
                    {forecast && <WeatherForecast forecast={forecast}/>}
                </>
            )}
            {loading && <div className="text-center">
                <div className="spinner-border text-primary spinner-md" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>}
        </div>
    )
};

export default Weather;
