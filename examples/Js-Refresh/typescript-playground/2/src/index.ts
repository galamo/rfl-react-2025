
import data from "./singleCountry.json"
console.log(data)
type SingleCountry = typeof data

type Country = {
    name: string,
    code: string,
    population: string,
    currencies: {
        [key: string]:
        { value: number, symbol: string }
    }
}

function aggregateByCurrency(data: Array<Country>) {
    if (!Array.isArray(data)) return;
    return data.filter((c) => c.name === "israel")
}
type ParitalCountry = Required<Partial<Country>>

interface Currency {
    symbol: string,
    value: number
}

interface Currency {
    code: string
}

const currency: Currency = { code: "ILS", value: 1, symbol: "ILS" }

aggregateByCurrency([
    { population: "10m", name: "israel", code: "ISR", currencies: { "ILS": { value: 1, symbol: "#" } } }
])


// function User(_value: number, _symbol: string): void {
//     this.value = _value
//     this.symbol = _symbol
// }
// const user = new User(1, "aa")
// console.log(user)
function getUser() {
    return { name: "galamo" }
}
console.log(getUser())

type AggregateCountry = Pick<SingleCountry, "ccn3" | "currencies" | "flags">
type AggregateCountry1 = Omit<SingleCountry, "ccn3">

function getTax(value: string | number){
    
}