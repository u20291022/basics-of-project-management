import axios from "axios"
import { WeatherData } from "./interfaces"
import { WeatherCode } from "./weather-codes.enum"
import { logs } from "./logs"

class WeatherAPI {
  readonly apiUrl = "https://api.open-meteo.com/v1/forecast"

  public getCurrentWeather = async (latitude: string | number, longitude: string | number): Promise<WeatherData> => {
    let weatherData: WeatherData = {
      temperature: 0,
      windspeed: 0,
      weathercode: 0,
      weathername: ""
    }

    if (latitude !== 0 || longitude !== 0) {
      const requestUrl = this.apiUrl + `?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      const response = await axios(requestUrl).catch((error) => logs.write(this.getErrorText(error)))
  
      if (response && response.data && response.data.current_weather) {
        weatherData = response.data.current_weather
        weatherData.weathername = this.getWeatherName(weatherData.weathercode)
      }
    }
    
    return weatherData
  }

  private getErrorText = (error: any): string => {
    const errorText = "Some error occured while geocode getting:\n" + error

    return errorText
  }

  private getWeatherName = (weatherCode: number): string => {
    let result = "Неизвестно"

    if (WeatherCode[weatherCode]) {
      result = WeatherCode[weatherCode]
    }

    if (weatherCode >= 50 && weatherCode <= 59) {
      result = "Морось"
    } else if (weatherCode >= 60 && weatherCode <= 69) {
      result = "Дождь"
    } else if (weatherCode >= 70 && weatherCode <= 79) {
      result = "Снег"
    }

    return result
  }
}

export const weatherAPI = new WeatherAPI()