import React, {FC} from "react";

interface IWeatherSearchProps {
    handleInputChange:(value: React.ChangeEvent<HTMLInputElement>) => void
    handleFormSubmit:(event: React.FormEvent<HTMLFormElement>) => void
    city: string
}
const WeatherSearch:FC<IWeatherSearchProps> = ({handleInputChange, handleFormSubmit, city}) => {
    return (
        <form onSubmit={handleFormSubmit} className="form-row py-2">
            <div className="form-group mb-2 mr-3 col-8 col-md-6">
                <label htmlFor="city" className="sr-only">city</label>
                <input type="search" className="form-control" id="city" placeholder="city" value={city}
                       onChange={handleInputChange}/>
            </div>
            <button className="btn btn-primary mb-2 col-3 col-md-2">Get Weather</button>
        </form>
    )
}

export default WeatherSearch