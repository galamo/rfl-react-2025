"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
exports.getProduct = getProduct;
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
exports.user = user;
//Extend
