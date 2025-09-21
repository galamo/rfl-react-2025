"use strict";
function saveCar(c) {
    // http save car in server.
    const id = "id_111";
    // return { lp: c.lp, color: "", type: c.type, doors: 4, idFromDb: id };
    return Object.assign(Object.assign({}, c), { doors: c.doors || 4, idFromDb: id });
    // return 1;
}
// Use Required Function Example
