import React, {FC, useState} from "react";
import WeatherDetails from "./WeatherDetails";
import type {ForecastDay} from "../../interfaces";

interface IForecastProps {
    forecast: ForecastDay[]
}

const WeatherForecast: FC<IForecastProps> = ({forecast}) => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const handleDayClick = (index: number) => {
        setSelectedDay(index);
    };

    return (
        <div className='form-row'>
            {forecast.map((day, index) => (
                <div className='card col-12 col-md-5 col-lg-3 m-1' key={day.date}>
                    <div className="card-body">
                        <p>{day.date}</p>
                        <p>High: <span className="badge badge-danger">{day.day.maxtemp_c}°C</span></p>
                        <p>Low: <span className="badge badge-primary">{day.day.mintemp_c}°C</span></p>
                        <p>Humidity: <span className="badge badge-info">{day.day.avghumidity}%</span></p>
                        <p>Wind Speed: <span className="badge badge-secondary">{day.day.maxwind_kph} km/h</span></p>
                        <img src={day.day.condition.icon} alt={day.day.condition.text}/>
                        <button className="btn btn-primary" onClick={() => handleDayClick(index)}>Details</button>
                        {selectedDay === index && <WeatherDetails day={day}/>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecast;
