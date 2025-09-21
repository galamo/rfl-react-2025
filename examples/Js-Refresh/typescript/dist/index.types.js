"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = __importDefault(require("./interface"));
const zod_1 = require("./zod");
console.log("zod validation");
const zod_2 = require("./zod");
// const result = UserScehma.safeParse({ url: "|", name: "aa", age: 20 });
// console.log(result.error?.issues);
(0, zod_2.initZod)();
const user = {
    name: "",
    url: "",
    age: 20,
};
function saveUser(u) {
    const result = zod_1.UserScehma.safeParse(u);
    console.log(result.error);
    console.log(result);
}
saveUser({ name: "aaaa", url: "aaaaaaaaaaaaaa", age: 2 });
console.log((0, interface_1.default)());
var Companies;
(function (Companies) {
    Companies[Companies["IBM"] = 1] = "IBM";
    Companies[Companies["Elbit"] = 2] = "Elbit";
    Companies[Companies["Google"] = 3] = "Google";
    Companies[Companies["Facebook"] = 4] = "Facebook";
})(Companies || (Companies = {}));
const user1 = {
    userName: "galamouyal88@gmail.com",
    company: Companies.IBM,
};
const user2 = { userName: "eli@gmail.com", company: Companies.Elbit };
const company = {
    name: "IBM",
    id: 124,
    cfo: "Naor",
    location: { city: "Givatayim", address: "arieal sharon", street: 4 },
};
console.log(company.cfo);
const subscriber = {
    password: "aa",
    userName: "aa",
    isAdmin: true,
    company: Companies.Facebook,
};
const u = {
    userName: "aa",
    roles: "admin",
    apartment: "",
    salary: 100000,
};
senduserToApi(u);
function senduserToApi(user) {
    return user;
}
// const newSubscriber: Pick<Subscriber, "password"> & Superuser & User = {
// };
const newSubscriber = {
    password: "aa",
    userName: "galamo",
    isAdmin: true,
};
getUser(111);
function getUser(userId) {
    return [];
}
function add(a, b) {
    if (typeof a === "number") {
        console.log(a);
    }
    else {
        console.log(a);
    }
    return 1;
}
add(1, 3);
add([33], [1]);
