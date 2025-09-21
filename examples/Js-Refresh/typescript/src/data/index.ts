import jsonData from "./country.json";

type Country = Partial<typeof jsonData>;

async function getCountry(): Promise<Country> {
  const result = await fetch("");
  const data = await result.json();
  return data;
}

type Countries = Array<Country>;
// type Countries = Country[];
