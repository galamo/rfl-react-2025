import { useState } from "react"
import css from "../countries.module.css"

export function CountryCard(props: { name: string, flag?: string, population?: number }) {
    const [show, setShowPopulation] = useState(false)
    return <div className={css.card}>
        <h1 style={{ cursor: "pointer" }} onClick={() => setShowPopulation(!show)}> {props.name} </h1>
        <img height={150} width={"100%"} src={props.flag} />
        {show ? <h3> {props.population} </h3> : null}
    </div>
}