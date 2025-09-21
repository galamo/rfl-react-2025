"use strict";
const carInstance = {
    model: "MAZDA",
    lp: "string",
    color: "string",
    doors: 4,
};
function getDayFromDate(date) {
    if (typeof (date === null || date === void 0 ? void 0 : date.getDay) !== "function")
        return;
    if (date.getDay() === 0)
        return "Sunday";
    if (date.getDay() === 1)
        return "Monday";
    return "Friday";
}
getDayFromDate(new Date());
