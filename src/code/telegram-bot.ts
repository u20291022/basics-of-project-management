import { textMessagesHandler } from "./text-messages-handler"
import { Telegraf, Telegram } from "telegraf"
import { TextMessage } from "./interfaces"
import { commands } from "./commands"
import { logs } from "./logs"

export class TelegramBot {
  readonly me: Telegraf
  readonly methods: Telegram

  constructor (token: string) {
    this.me = new Telegraf(token)
    this.methods = this.me.telegram
  }

  private listenTextMessages = (): void => {
    this.me.on("text", async context => {
      if (context && context.message && context.message.text) {
        const message: TextMessage = context.message
        await textMessagesHandler.handle(message, this.methods)
      }
    })
  }

  public launch = (): void => {
    this.methods.setMyCommands(commands.get())

    this.listenTextMessages()

    this.me.launch()
      .then(() => logs.write("basics-of-project-management bot was started."))
      .catch((error) => logs.write("some error occured:\n" + error))
  }
}