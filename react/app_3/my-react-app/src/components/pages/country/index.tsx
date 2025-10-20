import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleCountryApi } from '../../../services/countriesService';
import type { SingleCountry } from '../countries';

export function CountryPage() {
    const { countryId } = useParams();
    const [singleCountry, setSingleCountry] = useState<SingleCountry | null>(null)
    const [isLoadingCountry, setIsLoadingCountry] = useState(false)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        async function getSingleCountry() {
            try {
                setIsLoadingCountry(true)
                const singleCountryApi = await getSingleCountryApi(countryId as string)
                if (!singleCountryApi) throw new Error("Something went wrong..")
                if (singleCountryApi?.cca3?.toLowerCase() === "pse") throw new Error("No such country")
                setSingleCountry(singleCountryApi)
            } catch (ex: any) {
                setError(ex.message)
                // console.log(ex)
            } finally {
                setIsLoadingCountry(false)
            }
        }
        // zod valication ( 3 characters string)
        if (countryId) getSingleCountry()


    }, [])
    return <div>
        {isLoadingCountry ? <h2> Loading... </h2> : null}
        {error ? <h3 style={{ color: "red" }}> {error} </h3> : null}
        <h1>Country {countryId}</h1>
        {/* TODO: make this UI more pretty */}
        <div> {JSON.stringify(singleCountry)} </div>
    </div>
}