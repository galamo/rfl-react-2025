//@ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Button } from "@mui/material";
import millify from "millify";
import type { SingleCountry } from "../countries";
import { getCountriesApi } from "../../../services/countriesService";


const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function CountriesReportsPage() {
    const countriesInitialState: Array<SingleCountry> = [];
    const [countries, setCountries] = useState<Array<SingleCountry>>(countriesInitialState);
    const [size, setSize] = useState(0);

    const result = useMemo(() => {
        return calcPopulationPerRegion(countries);
    }, [countries]);

    // const result = calcPopulationPerRegion(countries);


    const adaptedData = adaptDataPieChart(result);
    useEffect(() => {
        async function getCountries() {
            try {
                const result = await getCountriesApi()
                setCountries(result);
            } catch (error) {
                console.log(error);
                alert("Something went wrong!");
            }
        }
        getCountries();
    }, []);

    return (
        <>
            <Button
                onClick={() => {
                    setSize(size + 10);
                }}
            >
                Click to resize {size}
            </Button>
            <div style={{ width: "100%" }}>
                <div
                    style={{
                        width: "80%",
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    {/* <div>
                        <PopulationPieChart
                            pieChartGlobalSettings={"resolution"}
                            adaptedData={data}
                        />
                    </div> */}
                    <div>
                        <PopulationPieChart
                            pieChartGlobalSettings={"resolution"}
                            adaptedData={adaptedData}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}

function PopulationPieChart(props: {
    pieChartGlobalSettings: string;
    adaptedData: Array<{ name: string; value: number | any }>;
}) {
    console.log(props.adaptedData);
    return (
        <PieChart width={700} height={450}>
            <Pie
                dataKey={"value"}
                data={props.adaptedData}
                cx="50%"
                cy="50%"
                label={"value"}
                outerRadius={200}
                fill="#8884d8"
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
}

function calcPopulationPerRegion(countries: Array<any>): number {
    console.log("===================================");
    console.log("calcPopulationPerRegion");
    console.log("===================================");
    return countries.reduce((regionsObj, currentCountry: any) => {
        const { region, population } = currentCountry;
        if (!region || !population) return regionsObj;
        if (regionsObj[region]) {
            return {
                ...regionsObj,
                [region]: regionsObj[region] + Number(population || 0),
            };
        } else {
            return { ...regionsObj, [region]: Number(population || 0) };
        }
    }, {});
}

const adaptDataPieChart = (obj: any) => {
    return Object.entries(obj).map(([key, value]) => {
        return { name: key, value };
    });
};