"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleCountry_json_1 = __importDefault(require("./singleCountry.json"));
console.log(singleCountry_json_1.default);
function aggregateByCurrency(data) {
    if (!Array.isArray(data))
        return;
    return data.filter((c) => c.name === "israel");
}
const currency = { code: "ILS", value: 1, symbol: "ILS" };
aggregateByCurrency([
    {
        population: "10m",
        name: "israel",
        code: "ISR",
        currencies: { ILS: { value: 1, symbol: "#" } },
    },
]);
// function User(_value: number, _symbol: string): void {
//     this.value = _value
//     this.symbol = _symbol
// }
// const user = new User(1, "aa")
// console.log(user)
function getUser() {
    return { name: "galamo" };
}
console.log(getUser());
function getTax(value, tax) {
    if (typeof value === 'string') {
        const n = parseInt(value) * tax;
        return n;
    }
    else {
        return value * tax;
    }
}
function createany(url, userOrId) {
}
function getDayFromDate(date) {
    if (new Date(date).getDay() + 1 === 1)
        return "Sunday";
    if (new Date(date).getDay() + 1 === 2)
        return "Monday";
}
getDayFromDate(new Date().toDateString());
function getSingleUser(users) {
    return users[0];
}
function getSingleProduct(products) {
    return products[0];
}
const b = getSingleUser(["user1", "user_2", "user__3"]);
async function getUserFromApi(id) {
    return { userName: "Ehud", age: 32, dbId: 1 };
}
function getWithID(id) {
    return { a: 1, dbId: 1 };
}
const fromDb = getWithID(1);
