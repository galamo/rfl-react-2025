import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { HeaderApp } from "../../header-app";
import data from "./dummyData.json";
import css from "./countries.module.css";
import { CountryCard } from "./card";
import axios from "axios";

export type SingleCountry = (typeof data)[0];

export function CountriesPage() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState<Array<SingleCountry>>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  useEffect(() => {

    async function getCountries() {
      try {
        setIsLoadingCountries(true)
        const url = "http://localhost:3000/api/data/countries-rfl"
        const result = await axios.get(url);
        setCountries(result.data as Array<SingleCountry>)
      } catch (ex: any) {
        console.log(ex)
      } finally {
        setIsLoadingCountries(false)
      }
    }
    getCountries()

  }, [])

  const filteredCountries = filter
    ? countries.filter((item: SingleCountry) =>
      item?.name?.common?.toLowerCase().includes(filter.toLowerCase())
    )
    : countries;
  return (
    <>
      <div>
        <div>
          {" "}
          <HeaderApp text="Countries" />{" "}
        </div>
        <input type="text" onChange={handleFilter} />
      </div>
      {isLoadingCountries ? <h2> Loading... </h2> : null}
      <div className={css.cardsWrapper}>
        {filteredCountries.map((item) => {
          return (
            <CountryCard
              key={item.name.common}
              population={item.population}
              name={item.name.common}
              flag={item?.flags?.png}
              code={item.cca3}
            />
          );
        })}
      </div>
    </>
  );
}
