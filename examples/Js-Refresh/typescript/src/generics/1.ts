import axios from "axios";
import { User } from "../index.types";

async function getUsers() {
  const result = await axios.get<User>("");
  return result.data;
}
type ReturnTypegetUsers = Awaited<ReturnType<typeof getUsers>>;
async function init() {
  const user: ReturnTypegetUsers = await getUsers();
}

function UserFactory() {
  return {
    email: "aaa",
    password: "111",
  };
}

type UserFactory = ReturnType<typeof UserFactory>;
type Product = {
  category: string;
};

function getSingleUser(users: Array<string>): string {
  return users[0];
}

function getSingleProduct(products: Array<Product>): Product {
  return products[0];
}

function getSingleObject<T>(arr: Array<T>): T & { id: number } {
  return { ...arr[0], id: 1 };
}
const arrayOfProducts: Array<Product> = [];
const productT = getSingleObject<Product>(arrayOfProducts);
