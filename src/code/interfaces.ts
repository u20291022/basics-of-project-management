export interface TextMessage {
  text: string,
  message_id: number,
  chat: { id: number }
  from: { first_name: string, id: number }
}

export interface ChatSettings {
  city: string
}

export interface JsonChatSettings {
  [key: string]: ChatSettings
}

export interface WeatherData {
  temperature: number,
  windspeed: number,
  weathercode: number,
  weathername: string
}

export interface GeocodeData {
  name: string,
  latitude: number,
  longitude: number
}

export interface CityCommandData {
  firstName: string,
  firstArgument: string,
}

export interface CommandData {
  command: string,
  description: string
}

export interface Json {
  [key: string]: any
}