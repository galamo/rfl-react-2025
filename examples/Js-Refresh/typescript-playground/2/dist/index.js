"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function aggregateByCurrency(data) {
    if (!Array.isArray(data))
        return;
    return data.filter((c) => c.name === "israel");
}
const currency = { code: "ILS", value: 1, symbol: "ILS" };
aggregateByCurrency([
    { population: "10m", name: "israel", code: "ISR", currencies: { "ILS": { value: 1, symbol: "#" } } }
]);
// function User(_value: number, _symbol: string): void {
//     this.value = _value
//     this.symbol = _symbol
// }
// const user = new User(1, "aa")
// console.log(user)
console.log("ttesttt");
