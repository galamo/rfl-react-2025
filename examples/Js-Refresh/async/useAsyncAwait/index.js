
const axios = require("axios")
const countriesUrlLocal = "http://localhost:3000/api/data/countries-rfl"
async function getCountriesData() {
    try {
        const result = await axios.get(countriesUrlLocal)
        const { data } = result;
        const countriesNames = getCountriesNames(data)
        const onlyHighPopulationCountries = getHighPopulationCountries(data)
        const countriesNames2 = getCountriesNames(onlyHighPopulationCountries)
        getTotalPopulation
        const regionStats = getRegionStatistics(data)
        const totalPopulation = getTotalPopulation(data)
        console.log(regionStats, totalPopulation)
    } catch (error) {
        console.log(error.message)
        console.log("Something went wrong!")
    }
}
// {"name":{"common":"Grenada","official":"Grenada"
function getCountriesNames(data) {
    if (!Array.isArray(data)) return;
    const countriesNames = data.map(c => { return c?.name?.official })
    return countriesNames;
}
function getHighPopulationCountries(data) {
    if (!Array.isArray(data)) return;
    const subsetData = data.filter((c) => c?.population > 727555691)
    return subsetData;
}
function getRegionStatistics(data) {
    if (!Array.isArray(data)) return;
    return data.reduce((regionStat, currentCountry) => {
        if (regionStat[currentCountry?.region]) {
            regionStat[currentCountry?.region] = regionStat[currentCountry?.region] + 1
        } else {
            regionStat[currentCountry?.region] = 1;
        }
        return regionStat
    }, {})
}
function getTotalPopulation(data) {
    if (!Array.isArray(data)) return;
    return data.reduce((totalPopulation, currentCountry) => {
        return totalPopulation + currentCountry.population
    }, 0)
}
getCountriesData()