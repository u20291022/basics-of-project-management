import { CityCommandData, TextMessage } from "./interfaces"
import { Telegram } from "telegraf"
import { commands } from "./commands"
import { settings } from "./settings"
import { logs } from "./logs"

import { startCommand } from "./start-command"
import { weatherCommand } from "./weather-command"
import { cityCommand } from "./city-command"

class CommandsHandler {
  public handle = async (message: TextMessage, methods: Telegram): Promise<void> => {
    const command = message.text
    const chatId = message.chat.id

    const firstName = message.from.first_name
    const firstArgument = commands.getArguments(command)[0]

    settings.initializeChatSettings(chatId)

    if (!commands.has(command)) return

    if (commands.equal(command, "start")) {
      await startCommand.answer(chatId, methods)
    }

    if (commands.equal(command, "weather")) {
      await weatherCommand.answer(chatId, methods)
    }

    if (commands.equal(command, "city")) {
      const cityData: CityCommandData = {
        firstName,
        firstArgument
      }

      await cityCommand.answer(chatId, cityData, methods)
    }

    logs.write(`${message.from.id} sent command: ${commands.getCommand(command)}`)
  }
}

export const commandsHandler = new CommandsHandler()