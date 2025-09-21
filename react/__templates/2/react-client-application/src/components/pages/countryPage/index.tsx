import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CountryApi } from "../countriesPage";
import axios from "axios";
import SingleCountry from "../countriesPage/singleCountry";
import { WithLoading } from "../../ui/with-loading";
const SINGLE_URL = `http://localhost:2200/api/countries-delay/name`;
export default function CountryPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<CountryApi | null>(null);

  useEffect(() => {
    console.log(params.code);
    if (!params.code) return;
    async function getCountry() {
      try {
        // setIsLoading(true);

        const result = await axios.get<{ result: CountryApi[] }>(
          `${SINGLE_URL}/${params.code}`
        );
        const { data } = result;
        const singleCountry: CountryApi = data?.result[0] as CountryApi;
        console.log(singleCountry);
        setCountry(singleCountry);
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    getCountry();
  }, [params.code]);

  return (
    <div>
      <h1>Country Page: {params.code}</h1>
      <div>
        <WithLoading isLoading={isLoading}>
          <SingleCountry {...(country as CountryApi)} />
        </WithLoading>
      </div>
    </div>
  );
}
