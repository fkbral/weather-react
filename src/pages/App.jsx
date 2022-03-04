import React, { useState } from 'react'
import './App.css'
import { api } from "../services/api"
import { FaSearch, FaTemperatureHigh, FaWind } from 'react-icons/fa'
import { v4 as uuid } from 'uuid'
import { Spinner } from '../components/Spinner'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("")
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const currentDate = new Date()

  const translatedCurrentWeatherTable = {
    "Partly cloudy": "Parcialmente nublado",
    "Clear": "Tempo limpo",
    "Light snow": "Neve leve",
    "Sunny": "Ensolarado",
    "Rain with thunderstorm": "Chuva com tempestade",
  }

  async function handleGetWeather(event) {
    event.preventDefault()

    if (isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const response = await api.get(search)

      const weatherWithTranslatedCurrentWeather = {
        ...response.data,
        description: 
        translatedCurrentWeatherTable[response.data.description]
        ?? response.data.description
    }

      setCity(search)
      setWeather(weatherWithTranslatedCurrentWeather)
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      <header>
        <form onSubmit={handleGetWeather}>
          <div className='icon-input'>
            <input
              placeholder='Ex: Campinas'
              type="text" value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <FaSearch />
          </div>
          <button>
            {isLoading ? 
              <Spinner />
              : <span>Pesquisar Cidade</span>
            }
          </button>
        </form>
      </header>

        {weather && 
          <main>
            <h1>{city}</h1>

            <section className="current-weather">
              <h2>Tempo atual</h2>

              <p>{weather.temperature}</p>
              <p>{weather.description}</p>
            </section>

            <section className="forecast">
              <h2>Previsão</h2>

              <ol>
              {
                weather.forecast.map((day, index) => 
                  <li key={uuid()}>
                    <h3>{index === 0 ? 
                  'Amanhã' 
                  : Intl.DateTimeFormat(
                    'pt-br', {weekday: 'long'}
                    ).format(new Date().setDate(currentDate.getDate() + index + 1))}
                    </h3>

                    <div>
                      <FaTemperatureHigh />
                      <p>{day.temperature}</p>
                    </div>

                    <div>
                      <FaWind />
                      <p>{day.wind}</p>
                    </div>
                  </li>
                )
              }
              </ol>
            </section>
          </main>
        }
    </div>
  )
}

export default App
