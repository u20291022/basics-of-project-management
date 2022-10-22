import { TextMessage } from "./interfaces"
import { Telegram } from "telegraf"
import { weatherAPI } from "./weather-api"
import { commands } from "./commands"
import { settings } from "./settings"
import { logs } from "./logs"
import { geocodeAPI } from "./geocode-api"

class CommandsHandler {
  constructor () {}

  private sendStartMessage = async (chatId: number, methods: Telegram): Promise<void> => {
    const startText = "Привет! 👋\nЯ пришлю текущую погоду ⛅️,\nа также помогу тебе одеться по погоде! 🧥"
    
    await methods.sendMessage(chatId, startText).catch(() => {})
  }

  private sendCurrentWeatherMessage = async (chatId: number, methods: Telegram): Promise<void> => {
    if (!settings.currentSettings[chatId]) return

    const cityName = settings.currentSettings[chatId].city
    const cityGeocode = await geocodeAPI.getCityGeocode(cityName)
    const weatherData = await weatherAPI.getCurrentWeather(cityGeocode.latitude, cityGeocode.longitude)

    let weatherText = `На данный момент, в городе "${cityName}":\n🌡 Температура: ${weatherData.temperature}°C\n💨 Скорость ветра: ${weatherData.windspeed} км/ч\n☁️ Погода: ${weatherData.weathername}`

    if (weatherData.windspeed === 0 &&
        weatherData.weathercode === 0 &&
        weatherData.temperature === 0) {
          weatherText = `Произошла ошибка 😬\nГород "${cityName}" неопределен.`
    }


    await methods.sendMessage(chatId, weatherText).catch(() => {})
  }

  private sendCorrectCityUseMessage = async (chatId: number, methods: Telegram): Promise<void> => {
    const correctCityUseText = "Команда /city используется так: /city название_города\nГде название_города является названием города на английском языке.\nНапример: /city Кемерово"
    
    await methods.sendMessage(chatId, correctCityUseText).catch(() => {})
  }

  private sendSuccessTextMessage = async (chatId: number, firstName: string, methods: Telegram): Promise<void> => {
    const successText = firstName + ", город успешно установлен!"
    
    await methods.sendMessage(chatId, successText).catch(() => {})
  }

  private setCity = (chatId: number, firstArgument: string): void => {
    const cityName = firstArgument

    settings.setParameter(chatId, "city", cityName)
    settings.updateSettingsFile()
  }

  public handle = async (message: TextMessage, methods: Telegram): Promise<void> => {
    const command = message.text
    const chatId = message.chat.id
    const firstName = message.from.first_name

    if (!settings.isChatExists(chatId)) {
      settings.initializeChatSettings(chatId)
      logs.write("Initialized chat with id: " + chatId)
    }

    if (!commands.has(command)) return

    if (commands.equal(command, "start")) {
      await this.sendStartMessage(chatId, methods)
    }

    if (commands.equal(command, "weather")) {
      await this.sendCurrentWeatherMessage(chatId, methods)
    }

    if (commands.equal(command, "city")) {
      const firstArgument = commands.getArguments(command)[0]
      const isCorrectCity = (typeof firstArgument === "string") && /([А-Яа-яA-Za-z]+)/.test(firstArgument)

      if (!isCorrectCity) {
        await this.sendCorrectCityUseMessage(chatId, methods)
      } else {
        this.setCity(chatId, firstArgument)
        await this.sendSuccessTextMessage(chatId, firstName, methods)
        await this.sendCurrentWeatherMessage(chatId, methods)
        logs.write(`${message.from.id} set city to ${firstArgument} in ${chatId} chat`)
      }
    }

    logs.write(`${message.from.id} sent command: ${commands.getCommand(command)}`)
  }
}

export const commandsHandler = new CommandsHandler()