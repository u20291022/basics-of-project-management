class Commands {
  readonly commands = [
    { command: "start", description: "Запускает работу бота." },
    { command: "weather", description: "Отправляет текущий прогноз погоды." },
    { command: "city", description: "Позволяет сменить текущий город." }
  ]

  public get = () => {
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

  public getArguments = (command: string): any[] => {
    const firstSpaceIndex = command.indexOf(" ")
    if (firstSpaceIndex <= 0) return []
    return command.slice(firstSpaceIndex + 1).split(" ")
  }

  public getCommand = (command: string) => {
    const firstSpaceIndex = command.indexOf(" ")
    if (firstSpaceIndex > 0) command = command.slice(0, firstSpaceIndex)
    return command.replace("/", "").replace("@basics_of_project_management_bot", "").replace(" ", "")
  }
}

export const commands = new Commands()