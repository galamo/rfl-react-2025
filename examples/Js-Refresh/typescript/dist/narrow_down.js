"use strict";
const admin = {
    type: "admin",
    name: "gal",
    role: "admin",
};
const user = {
    type: "user",
    name: "gal",
};
admin.role;
const employees = [admin, user];
function isAdmin(p) {
    return p.type == "admin";
    if (p === null || p === void 0 ? void 0 : p.role) {
        return true;
    }
    return false;
}
for (let index = 0; index < employees.length; index++) {
    const element = employees[index];
    if (isAdmin(element)) {
        console.log(element.role);
    }
    else {
        // console.log(element.role);
    }
}
// Narrow down example - p is Admin
