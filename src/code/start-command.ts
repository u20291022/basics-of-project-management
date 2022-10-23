import { Telegram } from "telegraf"

class StartCommand {
  public answer = async (chatId: number, methods: Telegram): Promise<void> => {
    const startText = this.getStartText()

    await methods.sendMessage(chatId, startText).catch(() => {})
  }

  private getStartText = (): string => {
    const startText = "Привет! 👋\n" + 
      "Я пришлю текущую погоду Российского города ⛅️,\n" + 
      "а также помогу тебе одеться по погоде! 🧥"

    return startText
  }
}

export const startCommand = new StartCommand