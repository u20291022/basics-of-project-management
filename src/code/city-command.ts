import { Telegram } from "telegraf"
import { CityCommandData } from "./interfaces"
import { logs } from "./logs"
import { settings } from "./settings"
import { weatherCommand } from "./weather-command"

class CityCommand {
  public answer = async (chatId: number, data: CityCommandData, methods: Telegram): Promise<void> => {
    let cityText = ""

    const { firstName, firstArgument } = data
    const correctUsage = this.isCorrectUsage(firstArgument)

    if (correctUsage) {
      logs.write(`${firstName} from ${chatId} chat changed city to ${firstArgument}`)
      cityText = this.getSuccessText(firstName, firstArgument)

      settings.setParameter(chatId, "city", firstArgument)
      settings.updateSettingsFile()

      weatherCommand.answer(chatId, methods)
    } else {
      cityText = this.getCorrectUsageText()
    }

    await methods.sendMessage(chatId, cityText).catch(() => {})
  }

  private getSuccessText = (firstName: string, firstArgument: string): string => {
    const successText = `${firstName}, город успешно установлен на "${firstArgument}"!`

    return successText
  }

  private getCorrectUsageText = (): string => {
    const correctUsageText = "Команда /city используется так: /city название_города\n" + 
      "Где название_города является названием города.\n" +
      "Название можно писать как на английском, так и на русском.\n" +
      "Для большей точности название следует писать на английском языке.\n" +
      "Например: /city Kemerovo"

    return correctUsageText
  }

  private isCorrectUsage = (firstArgument: string): boolean => {
    const argumentIsString = typeof firstArgument === "string"
    const argumentRegExPassed = /([А-Яа-яA-Za-z\-]+)/.test(firstArgument)

    return argumentIsString && argumentRegExPassed
  }
}

export const cityCommand = new CityCommand()