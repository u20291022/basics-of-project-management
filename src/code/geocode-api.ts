import axios from "axios"
import { cyrillicTranslator } from "./cyrillic-translator"
import { GeocodeData } from "./interfaces"
import { logs } from "./logs"

class GeocodeAPI {
  readonly apiUrl = "https://geocoding-api.open-meteo.com/v1/search"

  public getCityGeocode = async (cityName: string): Promise<GeocodeData> => {
    cityName = cyrillicTranslator.transliterateToEnglish(cityName)

    const requestUrl = this.apiUrl + `?name=${cityName.toLowerCase()}`
    const response = await axios(requestUrl).catch((error) => logs.write(this.getErrorText(error)))

    let geocodeData = {
      name: "",
      latitude: 0,
      longitude: 0
    }
    
    if (response && response.data && response.data.results) {
      const results = response.data.results
      
      results.forEach(city => {
        const countryCode = city.country_code
        
        if (countryCode === "RU" && geocodeData.name === "") {
          geocodeData = city
        }
      })
    }
    
    return geocodeData
  }

  private getErrorText = (error: any): string => {
    const errorText = "Some error occured while geocode getting:\n" + error

    return errorText
  }
}

export const geocodeAPI = new GeocodeAPI()