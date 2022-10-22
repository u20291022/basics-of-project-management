import axios from "axios"
import { WeatherData } from "./interfaces"
import { logs } from "./logs"

class WeatherAPI {
  readonly apiUrl = "https://api.open-meteo.com/v1/forecast"

  public getCurrentWeather = async (latitude: string | number, longitude: string | number): Promise<WeatherData> => {
    const emptyWeatherData: WeatherData = {
      temperature: 0,
      windspeed: 0,
      weathercode: 0,
      weathername: ""
    }
    
    if (latitude === longitude && latitude === 0) {
      return emptyWeatherData
    }

    const requestUrl = this.apiUrl + `?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    const response = await axios(requestUrl).catch((error) => logs.write("Some error occured while weather getting:\n" + error))

    if (!response || !response.data || !response.data.current_weather) {
      return emptyWeatherData
    }

    const weatherData: WeatherData = response.data.current_weather
    weatherData.weathername = this.getWeatherName(weatherData.weathercode)

    return weatherData
  }

  private getWeatherName = (weatherCode: number): string => {
    if (weatherCode >= 0 && weatherCode <= 3) return "без осадков"
    if (weatherCode >= 4 && weatherCode <= 19) return "присутствует дым"
    if (weatherCode === 20 || weatherCode === 21 || weatherCode === 25 || (weatherCode >= 60 && weatherCode <= 69) || (weatherCode >= 121 && weatherCode <= 123) || (weatherCode >= 160 && weatherCode <= 169) || (weatherCode >= 260 && weatherCode <= 269)) return "дождь"
    if ((weatherCode >= 22 && weatherCode <= 24) || (weatherCode >= 26 && weatherCode <= 27)) return "снегопад или град"
    if (weatherCode === 29) return "гроза"
    if (weatherCode >= 30 && weatherCode <= 39) return "метель"
    if ((weatherCode >= 40 && weatherCode <= 49) || weatherCode === 28 || weatherCode === 120 || (weatherCode >= 130 && weatherCode <= 139) || (weatherCode >= 240 && weatherCode <= 249)) return "туман"
    if ((weatherCode >= 50 && weatherCode <= 59) || (weatherCode >= 150 && weatherCode <= 159) || (weatherCode >= 250 && weatherCode <= 259)) return "морось"
    if ((weatherCode >= 70 && weatherCode <= 79) || weatherCode === 124 || (weatherCode >= 127 && weatherCode <= 129) || (weatherCode >= 170 && weatherCode <= 179) || (weatherCode >= 270 && weatherCode <= 279)) return "снегопад"
    if ((weatherCode >= 80 && weatherCode <= 99) || (weatherCode >= 180 && weatherCode <= 199)) return "ливень (возможно с грозой)"
    if (weatherCode >= 100 && weatherCode <= 119) return "неизвестно"
    if ((weatherCode >= 140 && weatherCode <= 149) || (weatherCode >= 280 && weatherCode <= 299)) return "осадки"
    if (weatherCode >= 200 && weatherCode <= 239) return "пыль или дымка"
    if (weatherCode >= 0 && weatherCode <= 3) return "Без осадков"
    return "неизвестно"
  }
}

export const weatherAPI = new WeatherAPI()