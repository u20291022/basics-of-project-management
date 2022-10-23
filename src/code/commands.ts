import { CommandData } from "./interfaces"

class Commands {
  readonly commands: CommandData[] = [
    { command: "start", description: "Запускает работу бота." },
    { command: "weather", description: "Отправляет текущий прогноз погоды." },
    { command: "city", description: "Изменяет текущий город." }
  ]

  public get = (): CommandData[] => {
    return this.commands
  }

  public has = (command: string): boolean => {
    command = this.getCommand(command)
    return !!this.commands.filter(cmd => { return cmd.command === command })[0]
  }

  public equal = (command1: string, command2: string): boolean => {
    command1 = this.getCommand(command1), command2 = this.getCommand(command2)
    return command1 === command2    
  }

  public getCommand = (command: string) => {
    const firstSpaceIndex = command.indexOf(" ")
    if (firstSpaceIndex > 0) command = command.slice(0, firstSpaceIndex)
    return command.replace("/", "").replace("@basics_of_project_management_bot", "").replace(" ", "")
  }
  
  public getArguments = (command: string): any[] => {
    const firstSpaceIndex = command.indexOf(" ")
    if (firstSpaceIndex <= 0) return []
    return command.slice(firstSpaceIndex + 1).split(" ")
  }
}

export const commands = new Commands()