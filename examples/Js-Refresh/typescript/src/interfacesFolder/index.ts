import { A as A1 } from "./typeA";
import { A as A2 } from "./typeB";

interface ProductFromLib {
  title: string;
  price: number;
  id: number;
  category: string; // change it in a while.
}
// interface SuperMarketProduct extends ProductFromLib {
//   expirationDate: Date;
// }

interface ProductFromLib {
  expirationDate: Date;
}

// Type Decleration
//  export statements

export function getProduct(): ProductFromLib {
  return {
    title: "Coffee",
    price: 2,
    id: 1234,
    category: "Drink",
    expirationDate: new Date(),
  };
}
const user = 1;
export { user, A1, A2 };

//Extend
