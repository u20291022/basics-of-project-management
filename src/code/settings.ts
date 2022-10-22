import { fileSystem } from "./filesystem"
import { ChatSettings, JsonChatSettings } from "./interfaces"

class Settings {
  readonly settingsDirectoryPath = "data"
  readonly currentSettings: JsonChatSettings

  readonly defaultChatSettings: ChatSettings = {
    city: "Кемерово"
  }

  constructor () {
    fileSystem.createPath(this.settingsDirectoryPath)

    if (fileSystem.exists(this.getSettingsPath())) {
      this.currentSettings = fileSystem.readJsonFile(this.getSettingsPath())
    } else {
      this.currentSettings = {}
    } 
  }

  public setParameter = (chatId: number, parameterName: string, value: any): void => {
    const chatSettings = this.currentSettings[chatId]

    if (chatSettings && chatSettings[parameterName]) {
      chatSettings[parameterName] = value
    }
  }

  public initializeChatSettings = (chatId: number): void => {
    this.setChatSettings(chatId, this.defaultChatSettings)
  }

  public getChatSettings = (chatId: number): ChatSettings => {
    return this.currentSettings[chatId]
  }

  public setChatSettings = (chatId: number, chatSettings: ChatSettings): void => {
    this.currentSettings[chatId] = JSON.parse(JSON.stringify(chatSettings))
  }

  public isChatExists = (chatId: number): boolean => {
    return !!this.currentSettings[chatId]
  }

  public updateSettingsFile = (): void => {
    fileSystem.writeToJsonFile(this.getSettingsPath(), this.currentSettings)
  }

  private getSettingsPath = (): string => {
    return this.settingsDirectoryPath + "/settings.json"
  }
}

export const settings = new Settings()