import axios from "axios"
import { GeocodeData } from "./interfaces"
import { logs } from "./logs"

class GeocodeAPI {
  private alphabet = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"А","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
  readonly apiUrl = "https://geocoding-api.open-meteo.com/v1/search"

  public getCityGeocode = async (cityName: string): Promise<GeocodeData> => {
    cityName = this.transliterate(cityName)

    const requestUrl = this.apiUrl + `?name=${cityName}`
    const response = await axios(requestUrl).catch((error) => logs.write("Some error occured while geocode getting:\n" + error))

    const emptyGeocodeData = {
      latitude: 0,
      longitude: 0
    }

    if (!response || !response.data || !response.data.results) {
      return emptyGeocodeData
    }

    const results = response.data.results

    for (let i = 0; i < results.length; i++) {
      if (results[i].country_code === "RU") {
        const geocodeData: GeocodeData = results[i]
        return geocodeData
      }
    }

    return emptyGeocodeData
  }

  private transliterate = (str: string) => {
    const localAlphabet = this.alphabet

    return str.split("").map(function (char) { 
      return localAlphabet[char] || char; 
    }).join("");
  }
}

export const geocodeAPI = new GeocodeAPI()