import React, { useState } from 'react'
import './Weather.css'
const api = {
    key: 'ac385f79f9345657a234229392622e00',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const Weather = () => {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const [error, setError]= useState(null)
    const search = (e) => {
        if (e.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=matric&appid=${api.key}`)
            .then((res) => {
                if (!res.ok) {
                  throw new Error('Weather data not found'); // Handle the error
                }
                return res.json();
              })
                .then(result => {
                    setWeather(result);
                    setQuery('')
                    console.log(result)
                })
                .catch((err)=>{
                    setError (err.message)
                })
        }

    }
    const dateBuilder = (d) => {
        let months = ['January', 'Feberuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    }
    return (
        
        <div className={(typeof weather.main !== 'undefined') ? (weather.weather[0].main === 'Dust' ? 'app dust' : (weather.weather[0].main === 'Sand' ? 'app sand' : (weather.weather[0].main === 'Squall' ? 'app squall' : (weather.weather[0].main === 'Thunderstorm' ? 'app thunderstorm' : (weather.weather[0].main === 'Fog' ? 'app fog' : (weather.weather[0].main === 'Haze' ? 'app haze' : (weather.weather[0].main === 'Mist' ? 'app mist' : (weather.weather[0].main === 'Rain' ? 'app rain' : (weather.weather[0].main === 'Smoke' ? 'app smoke' : (weather.weather[0].main === 'Drizzle' ? 'app drizzle' : (weather.weather[0].main === 'Clear' ? 'app clear' : (weather.weather[0].main === 'Clouds' ? 'app cloud' : (weather.weather[0].main === 'Ash' ? 'app ash' : (weather.weather[0].main === 'Snow' ? 'app snow' : 'app cold')))))))))))))) : 'app'}>
            <main>
                <h1 className='heading'>Know Your Weather</h1>
                <div className='search-box'>
                    <input type='text' className='search-bar' placeholder='Search...' value={query} onChange={event => setQuery(event.target.value)} onKeyPress={search} />

                </div>
                
                {error ?(
                <div className='error-box'>
                    <p className='error'>{error}</p>
                </div>):

                (typeof weather.main !== 'undefined') ? (
                    <div className='location-box'>
                        <div className='location'>
                            {weather.name}, {weather.sys.country}
                        </div>
                        <div className='date'>
                            {dateBuilder(new Date())}
                        </div>
                        <div className='weather-box'>
                            <div className='temp'>
                                {Math.round(weather.main.temp - 273.15)}°C
                            </div>
                            <div className='weather'>
                                {weather.weather[0].main}
                            </div>

                        </div>

                    </div>
                ) : (' ')}
                <div>

                </div>

            </main>
        </div>
    )
}
export default Weather;

