"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAdmins = requestAdmins;
exports.requestUsers = requestUsers;
const admins = [
    { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
    { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];
const users = [
    {
        type: "user",
        name: "Max Mustermann",
        age: 25,
        occupation: "Chimney sweep",
    },
    { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];
;
function requestAdmins(callback) {
    callback({
        status: "success",
        data: admins,
    });
}
function requestUsers(callback) {
    callback({
        status: "success",
        data: users,
    });
}
function getUsers() {
    return {
        status: "success",
        data: users,
    };
}
