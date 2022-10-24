import { WeatherData } from "./interfaces"

class ClothesConstructor {
  public getClothesText = (weatherData: WeatherData): string => {
    const clothesText = this.getClothesByTemperature(weatherData.temperature) +
      this.getClothesByWeather(weatherData.weathername) +
      this.getClothesByWindspeed(weatherData.windspeed)

    return clothesText
  }

  private getClothesByWeather = (weatherName: string): string => {
    weatherName = weatherName.toLowerCase()
    let result = "На погоду не стоит обращать большого внимания ⛅️"

    if (weatherName.includes("морось")) {
      result = "На улице присутсвует морось. Желательно иметь при себе защиту от возможного дождя. 🌧"
    } else if (weatherName.includes("дождь") || weatherName.includes("ливень")) {
      result = "На улице возможен дождь, стоит взять зонтик! ☂️"
    } else if (weatherName.includes("снег") || weatherName.includes("метель")) {
      result = "Уже идет снег, а это значит, что стоит отказаться от тканевой одежды и обуви 🧵 (если нет желания промокнуть и замерзнуть 🥶)"
    } else if (weatherName.includes("град")) {
      result = "Идет град, стоит надеть шапку или капюшон 👒"
    }

    return "🔹 " + result + "\n"
  }

  private getClothesByWindspeed = (windspeed: number): string => {
    let result = ""

    if (windspeed >= 20) {
      result = "На улице очень сильный ветер! Следует прихватить с собой шапку и шарф 🧣"
    } else if (windspeed >= 15) {
      result = "Снаружи достаточно сильный ветер, стоит задуматься о своих ушках и горле 🐱"
    } else if (windspeed >= 10) {
      result = "В совокупности с низкой температурой, небольшой ветер тоже имеет значение 🌬"
    } else if (windspeed >= 0) {
      result = "На данный момент, ветер такой слабый, что можно не обращать на него внимания 🙂"
    }

    return "🔹 " + result + "\n"
  }

  private getClothesByTemperature = (temperature: number): string => {
    let result = ""

    if (temperature >= 20) {
      result = "Советую одеться полегче - на улице жарко! ☀️"
    } else if (temperature >= 15) {
      result = "На улице тепло, но стоит захватить верхнюю одежду с собой 😁"
    } else if (temperature >= 10) {
      result = "Уже достаточно прохладно, стоит накинуть на себя что-нибудь потеплее футболки 😉"
    } else if (temperature >= 0) {
      result = "Тебе нужно надеть легкую куртку или пальто! 🥼"
    } else if (temperature >= -5) {
      result = "На улице наверняка лежит снег, ведь минусовая температура отличный тому показатель! Уже стоит одеваться в несколько слоев 🧦"
    } else if (temperature >= -10) {
      result = "Самое время надеть зимнюю одежду! ❄️"
    } else if (temperature >= -15) {
      result = "На улице очень даже холодно, стоит поддеть теплую одежду! 🧤"
    } else if (temperature < -15) {
      result = "Одевайся тепло, на улице меньше -15 градусов! ☃️"
    }

    return "🔹 " + result + "\n"
  }
}

export const clothesConstructor = new ClothesConstructor()