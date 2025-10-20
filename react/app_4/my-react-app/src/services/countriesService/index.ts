import axios from "axios";
import type { SingleCountry } from "../../components/pages/countries"

const baseUrl = "http://localhost:3000/api" // app config using environment
export async function getCountries() {

}


export async function getSingleCountryApi(code: string): Promise<SingleCountry> {
    const url = `${baseUrl}/data/countries/code/${code}`
    const result = await axios.get(url);
    if (!Array.isArray(result.data.data)) throw new Error("Country not found")
    return result.data.data[0] as SingleCountry
}