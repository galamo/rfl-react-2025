import { useState } from "react"
import { HeaderApp } from "../../header-app";
import data from "./dummyData.json"
import css from "./countries.module.css"
import { CountryCard } from "./card"
type SingleCountry = typeof data[0]


export function CountriesPage() {
    const [filter, setFilter] = useState("")
    function handleFilter(e: any) {
        // console.log("Do something", e.target.value)
        setFilter(e.target.value)
    }
    const countries = filter ? data.filter(item => item?.name?.common?.toLowerCase().includes(filter.toLowerCase())) : data
    return <>
        <div>
            <div> <HeaderApp text="Countries" /> </div>
            <input type="text" onChange={handleFilter} />
        </div>
        <div className={css.cardsWrapper}>

            {countries.map((item: SingleCountry) => {
                return <CountryCard key={item.name.common} population={item.population} name={item.name.common} flag={item?.flags?.png} />
            })}
        </div>
    </>

}

