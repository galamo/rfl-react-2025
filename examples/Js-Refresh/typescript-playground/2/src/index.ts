import data from "./singleCountry.json";
console.log(data);
type SingleCountry = typeof data;

type Country = {
    name: string;
    code: string;
    population: string;
    currencies: {
        [key: string]: { value: number; symbol: string };
    };
};

function aggregateByCurrency(data: Array<Country>) {
    if (!Array.isArray(data)) return;
    return data.filter((c) => c.name === "israel");
}
type ParitalCountry = Required<Partial<Country>>;

interface Currency {
    symbol: string;
    value: number;
}

interface Currency {
    code: string;
}

const currency: Currency = { code: "ILS", value: 1, symbol: "ILS" };

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

type AggregateCountry = Pick<SingleCountry, "ccn3" | "currencies" | "flags">;
type AggregateCountry1 = Omit<SingleCountry, "ccn3">;

function getTax(value: string | number, tax: number): number {
    if (typeof value === 'string') {
        const n = parseInt(value) * tax
        return n;
    } else {
        return value * tax
    }
}


function createany(url: string, user: string): any;
function createany(url: string, userIdPassword: number): any;

function createany(url: string, userOrId: string | number): any {
}

type DayOfWeeks =
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";

function getDayFromDate(date: string): DayOfWeeks | undefined {
    if (new Date(date).getDay() + 1 === 1) return "Sunday";
    if (new Date(date).getDay() + 1 === 2) return "Monday";

}




getDayFromDate(new Date().toDateString())



function getSingleUser(users: string[]): string {
    return users[0];
}


function getSingleProduct(products: number[]): number {
    return products[0];
}

const b = getSingleUser(["user1", "user_2", "user__3"])

type User = { userName: string, age: number }

async function getUserFromApi(id: number): Promise<User & { dbId: number }> {
    return { userName: "Ehud", age: 32, dbId: 1 }
}
type WithId = { dbId: number }
function getWithID<T>(id: number): T & WithId {
    return { a: 1, dbId: 1 }
}
const fromDb = getWithID<User>(1)

type FnReturn = Awaited<ReturnType<typeof getUserFromApi>>
type FnReturn1 = ReturnType<typeof getUserFromApi>


