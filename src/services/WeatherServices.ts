import axios from "axios";
import type {IWeatherForecastData} from "../interfaces";

export const API_KEY = "4af7d5ea77da4d4ab7731034232104";
const url = `https://api.weatherapi.com/v1/`;

export const WeatherService = {
    async getWeatherData(value: string) {
        try {
            const {data} = await axios.get(`${url}current.json?key=${API_KEY}&q=${encodeURIComponent(value)}&aqi=no`)
            return data
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getForecast(value: string) {
        try {
            const {data} = await axios.get<IWeatherForecastData>(
                `${url}forecast.json?key=${API_KEY}&q=${value}&days=5`
            );
            return data
        } catch (error) {
            console.log(error, 'error');
        }
    }
}