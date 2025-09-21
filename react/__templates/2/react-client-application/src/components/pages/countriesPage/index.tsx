import { useEffect, useState } from "react";
import axios from "axios";
import data from "./index.json";
import SingleCountry from "./singleCountry";
import css from "./index.module.css";
import Header from "../../ui/header";
import debounce from "lodash/debounce";
import { Badge, CircularProgress, Skeleton, TextField } from "@mui/material";

const URL_ALL = "http://localhost:2200/api/countries-delay";
const URL_NAME = "http://localhost:2200/api/countries-delay/name/";

export type CountryApi = (typeof data)[0];
export default function CountriesPage() {
  const [countries, setCountries] = useState<CountryApi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countryName, setCountryName] = useState<string>("");

  useEffect(() => {
    let isSubscribed = true;
    console.log(
      `start seach for: ${countryName} => subscribed: ${isSubscribed}`
    );

    async function getCountries() {
      try {
        setIsLoading(true);
        const url = countryName ? `${URL_NAME}${countryName}` : URL_ALL;
        const result = await axios.get<CountryApi[]>(url);
        const { data } = result;
        console.log(data);
        if (isSubscribed) {
          console.log(
            `setCountries seach for: ${countryName} => subscribed: ${isSubscribed}`
          );
          // @ts-ignore
          setCountries(data?.data || data?.result);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    getCountries();
    return () => {
      isSubscribed = false;
      console.log(
        `cleanup seach for: ${countryName} => subscribed: ${isSubscribed}`
      );
    };
  }, [countryName]);

  function handleSearch(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(`countryName: ${event.target.value}`);
    setCountryName(event.target.value);
  }

  const handleSearchDebounce = debounce(handleSearch, 400);

  return (
    <div>
      <div className={css.headerCenter}>
        <Header title={"Countries"} color={"Blue"} />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Country Name"
          variant="outlined"
          onChange={handleSearchDebounce}
        />
        <Badge badgeContent={countries.length} color="primary"></Badge>
        {isLoading ? <CircularProgress /> : null}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {isLoading ? <DummySkeletonCountries /> : null}
        {countries.map((c) => {
          return <SingleCountry key={c?.cca3} {...c} />;
        })}
      </div>
    </div>
  );
}

function DummySkeletonCountries() {
  const skeletons = [];
  for (let index = 0; index < 12; index++) {
    skeletons.push(
      <Skeleton key={index} variant="rectangular" width={300} height={500} />
    );
  }
  return skeletons;
}
