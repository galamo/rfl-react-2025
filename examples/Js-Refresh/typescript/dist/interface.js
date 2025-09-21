"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameSpace = void 0;
exports.default = getProduct;
// Type Decleration
//  export statements
function getProduct() {
    return {
        title: "Coffee",
        price: 2,
        id: 1234,
        category: "Drink",
        expirationDate: new Date(),
    };
}
const user = 1;
const nameSpace = { UserNameSpace: user };
exports.nameSpace = nameSpace;
//Extend
