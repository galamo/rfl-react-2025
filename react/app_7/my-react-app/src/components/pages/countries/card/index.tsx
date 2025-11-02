//@ts-nocheck
import { useState } from "react";
import css from "../countries.module.css";
import { Navigate, useNavigate } from "react-router-dom";

export function CountryCard(props: {
  name: string;
  flag?: string;
  population?: number;
  code?: string
}) {
  const [show, setShowPopulation] = useState(false);
  const navigate = useNavigate()
  return (
    <div className={css.card}>
      <h3
        style={{ cursor: "pointer" }}
        onClick={() => setShowPopulation(!show)}
      >
        {" "}
        {props.name}{" "}
      </h3>
      <img height={150} width={"100%"} src={props.flag} />
      {show ? <h3> {props.population} </h3> : null}
      <button onClick={() => {
        navigate(`/country/${props.code}`)
      }}>
        Go to
      </button>
    </div>
  );
}
