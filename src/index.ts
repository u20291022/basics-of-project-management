import { TelegramBot } from "./code/telegram-bot"

async function main(): Promise<void> {
  const telegramBotToken = "5349159240:AAF1mxs-_fYULqkTfyVNOD3-sbCx4TPFY9c"
  const telegramBot = new TelegramBot(telegramBotToken)

  telegramBot.launch()
}

main()