type Car2 = {
  model: "BMW" | "MRCDS" | "MAZDA";
  lp: string;
  color: string;
  doors?: number;
};

const carInstance: Car2 = {
  model: "MAZDA",
  lp: "string",
  color: "string",
  doors: 4,
};

type DaysOfWeeks = "Sunday" | "Monday" | "Friday";

function getDayFromDate(date: Date): DaysOfWeeks | undefined {
  if (typeof date?.getDay !== "function") return;
  if (date.getDay() === 0) return "Sunday";
  if (date.getDay() === 1) return "Monday";
  return "Friday";
}
getDayFromDate(new Date());

type StringFromType<T> = T extends string ? string : number;
