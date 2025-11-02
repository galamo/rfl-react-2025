import { useState, useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import { HeaderApp } from "../../header-app";
import data from "./dummyData.json";
import css from "./countries.module.css";
import { CountryCard } from "./card";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCountries, searchCountriesByName, setFilter } from "../../../store/slices/countriesSlice";

export type SingleCountry = (typeof data)[0];

export function CountriesPage() {
  const [counter, setCounter] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [localFilter, setLocalFilter] = useState("");
  
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const { countries, loading, filter } = useAppSelector((state) => state.countries);

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setLocalFilter(value);
  }

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date based on custom format
  const formatDate = (date: Date, format: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  };

  // Format time based on timezone setting
  const formatTime = (date: Date) => {
    const dateStr = formatDate(date, settings.dateFormat);
    const timeStr = date.toLocaleTimeString();
    
    if (settings.timezone === "UTC") {
      const utcDate = new Date(date.toUTCString());
      const utcDateStr = formatDate(utcDate, settings.dateFormat);
      return `${utcDateStr} ${utcDate.toUTCString().split(' ')[4]} UTC`;
    } else {
      return `${dateStr} ${timeStr}`;
    }
  };

  // Create debounced function with useMemo to avoid recreating it on every render
  const handleSearchDebounce = useMemo(
    () =>
      _.debounce((value: string) => {
        dispatch(setFilter(value));
        if (!value) {
          dispatch(fetchCountries());
        } else {
          dispatch(searchCountriesByName(value));
        }
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    handleSearchDebounce(localFilter);
    // Cleanup function to cancel pending debounced calls
    return () => {
      handleSearchDebounce.cancel();
    };
  }, [localFilter, handleSearchDebounce]);

  return (
    <>
      <div>
        <div>
          <button
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            {" "}
            Counter{" "}
          </button>
          <HeaderApp text={"Countries " + counter} />{" "}
        </div>
        <div
          style={{
            marginBottom: "10px",
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "5px",
          }}
        >
          <strong>Current Time ({settings.timezone}):</strong> {formatTime(currentTime)}
        </div>
        <input type="text" onChange={handleFilter} />
      </div>
      {loading ? <h2> Loading... </h2> : null}
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
