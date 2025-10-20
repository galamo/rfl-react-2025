import { useState } from "react"
import { HeaderApp } from "../header-app"

export function CounterTest() {
    const [count, setCount] = useState<number>(0)
    console.log(count)
    console.log("run fun ...")


    return <>
        <HeaderApp text="Counter Test" />
        <button onClick={() => { setCount(count + 1) }}> Click here {count}</button>
    </>

}