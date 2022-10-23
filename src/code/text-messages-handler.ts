import { TextMessage } from "./interfaces"
import { Telegram } from "telegraf"
import { commandsHandler } from "./commands-handler"

class TextMessagesHandler {
  private isTextCommand = (text: string): boolean => {
    return text[0] === "/" && (!text.includes("@") || text.includes("@basics_of_project_management_bot"))
  }

  public handle = async (message: TextMessage, methods: Telegram): Promise<void> => {
    const text = message.text

    if (this.isTextCommand(text)) {
      await commandsHandler.handle(message, methods)
    }
  }
}

export const textMessagesHandler = new TextMessagesHandler()