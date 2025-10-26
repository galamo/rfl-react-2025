import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { HeaderApp } from "../../header-app";
import data from "./dummyData.json";
import css from "./countries.module.css";
import { CountryCard } from "./card";
import _ from "lodash";
import { Navigate } from "react-router-dom"

import {
  getCountriesApi,
  getCountriesByNameApi,
} from "../../../services/countriesService";

export type SingleCountry = (typeof data)[0];

export function CountriesPage() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState<Array<SingleCountry>>([]);
  const [counter, setCounter] = useState<number>(0);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const handleSearchDebounce = _.debounce(handleFilter, 300)
  useEffect(() => {
    let submitState = true;
    async function getCountries() {
      try {
        setIsLoadingCountries(true);
        const result = !filter
          ? await getCountriesApi()
          : await getCountriesByNameApi(filter);
        if (submitState) {
          console.log(
            `===== submitState = ${submitState} filter = ${filter} =====`
          );
          setCountries(result as Array<SingleCountry>);
        }
      } catch (ex: unknown) {
        if (ex instanceof Error) {
          console.log(ex.message);
        }
      } finally {
        setIsLoadingCountries(false);
      }
    }
    getCountries();
    return () => {
      submitState = false;
      console.log(
        `===== submitState = ${submitState} filter = ${filter} =====`
      );
      console.log("cleanup...filter?");
    };
  }, [filter]);

  return (
    <>
      <div>
        <div>
          <button onClick={() => {
            setCounter(counter + 1)
          }}> Counter </button>
          <HeaderApp text={"Countries " + counter} />{" "}
        </div>
        <input type="text" onChange={handleSearchDebounce} />
      </div>
      {isLoadingCountries ? <h2> Loading... </h2> : null}
      <div className={css.cardsWrapper}>
        {countries.map((item) => {
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
