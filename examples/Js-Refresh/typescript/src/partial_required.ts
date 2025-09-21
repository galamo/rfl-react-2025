type Car = {
  lp: string;
  color: string;
  type: string;
  doors?: number;
};

type WithId = {
  idFromDb?: string;
};
type CarApi = Required<Car & WithId>;
function saveCar(c: Car): CarApi {
  // http save car in server.

  const id: string = "id_111";
  // return { lp: c.lp, color: "", type: c.type, doors: 4, idFromDb: id };
  return { ...c, doors: c.doors || 4, idFromDb: id };
  // return 1;
}

// Use Required Function Example
