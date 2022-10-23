import { Telegram } from "telegraf"
import { geocodeAPI } from "./geocode-api"
import { settings } from "./settings"
import { weatherAPI } from "./weather-api"

class WeatherCommand {
  public answer = async (chatId: number, methods: Telegram): Promise<void> => {
    const weatherText = await this.getWeatherText(chatId)

    await methods.sendMessage(chatId, weatherText).catch(() => {})
  }

  private getWeatherText = async (chatId: number): Promise<string> => {
    let weatherText = ""
    const currentChatSettings = settings.getChatSettings(chatId)

    if (!currentChatSettings) return "Произошла непредвиденная ошибка. 😟\nПопробуйте позже."

    const cityName = currentChatSettings.city
    const cityGeocode = await geocodeAPI.getCityGeocode(cityName)

    const { name, latitude, longitude } = cityGeocode
    const weatherData = await weatherAPI.getCurrentWeather(latitude, longitude)

    if (weatherData.weathername !== "") {
      weatherText = `На данный момент, в городе "${name}":\n` +
        `🌡 Температура: ${weatherData.temperature}°C\n` +
        `💨 Скорость ветра: ${weatherData.windspeed} км/ч\n` +
        `☁️ Погода: ${weatherData.weathername}\n` +
        `📄 Код погоды: ${weatherData.weathercode}`
    } else {
      weatherText = `Произошла ошибка 😬\n` + 
        `Город "${cityName}" неопределен.`
    }

    return weatherText
  }
}

export const weatherCommand = new WeatherCommand()