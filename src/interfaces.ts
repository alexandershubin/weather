export interface IDayForecast {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
        text: string;
        icon: string;
    };
    avghumidity: number;
    maxwind_kph: number;
    uv: number;
    totalprecip_mm: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: string;
    daily_will_it_snow: number;
    daily_chance_of_snow: string;
}

export interface ForecastDay {
    date: string;
    day: IDayForecast
}

export interface WeatherForecastData {
    forecast: {
        forecastday: ForecastDay[];
    };
}

export interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        feelslike_c: number;
        condition: {
            text: string;
        };
    };
}
