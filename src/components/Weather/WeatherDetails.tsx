import React, {FC} from "react";
import type {IForecastDay} from "../../interfaces";

interface IWeatherDetailsProps {
    day: IForecastDay;
    handleDayClickClose:() => void
}

const WeatherDetails:FC<IWeatherDetailsProps> = ({ day, handleDayClickClose }) => {
    return (
        <div className="m-2">
            <h2>{day.date}</h2>
            <p>Max Temperature: <span className="badge badge-danger">{day.day.maxtemp_c}°C</span></p>
            <p>Min Temperature: <span className="badge badge-primary">{day.day.mintemp_c}°C</span></p>
            <p>Condition: <span className="badge badge-warning">{day.day.condition.text}</span></p>
            <img src={day.day.condition.icon} width={50} height={50} alt={day.day.condition.text} />
            <p>UV Index: <span className="badge badge-dark">{day.day.uv}</span></p>
            <p>Max Wind Speed: <span className="badge badge-secondary">{day.day.maxwind_kph} km/h</span></p>
            <p>Total Precipitation: <span className="badge badge-success">{day.day.totalprecip_mm} mm</span></p>
            {day.day.daily_will_it_rain === 1 && (
                <p>Chance of Rain: <span className="badge badge-info">{day.day.daily_chance_of_rain}%</span></p>
            )}
            {day.day.daily_will_it_snow === 1 && (
                <p>Chance of Snow: <span className="badge badge-info">{day.day.daily_chance_of_snow}%</span></p>
            )}
            <button className="btn btn-primary" onClick={handleDayClickClose}>Close</button>
        </div>
    );
};

export default WeatherDetails;