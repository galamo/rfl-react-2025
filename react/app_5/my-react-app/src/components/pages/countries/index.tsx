import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { HeaderApp } from "../../header-app";
import data from "./dummyData.json";
import css from "./countries.module.css";
import { CountryCard } from "./card";
import axios from "axios";
// import _ from "lodash";

import {
  getCountriesApi,
  getCountriesByNameApi,
} from "../../../services/countriesService";
import { Navigate } from "react-router-dom";

export type SingleCountry = (typeof data)[0];

export function CountriesPage() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState<Array<SingleCountry>>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

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

  // if (!localStorage.getItem("token")) return <Navigate to={"/login"} />;
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
