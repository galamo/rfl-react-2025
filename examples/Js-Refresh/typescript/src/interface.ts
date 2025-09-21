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

export default function getProduct(): ProductFromLib {
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
export { nameSpace };

//Extend
