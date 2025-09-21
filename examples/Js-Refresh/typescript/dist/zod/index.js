"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserScehma = void 0;
exports.initZod = initZod;
const zod_1 = require("zod");
// creating a schema for strings
// const mySchema = z.string();
// // parsing
// mySchema.parse("tuna"); // => "tuna"
// mySchema.parse(12); // => throws ZodError
// // "safe" parsing (doesn't throw error if validation fails)
// mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
// mySchema.safeParse(12); // => { success: false; error: ZodError }
exports.UserScehma = zod_1.z.object({
    url: zod_1.z.string().min(8).optional(),
    name: zod_1.z.string().max(20),
    age: zod_1.z.number().min(2).max(3).optional(),
});
const DocumentSchema = zod_1.z.object({
    countryName: zod_1.z.string().max(5),
    countryCode: zod_1.z.string().max(3).min(3),
    region: zod_1.z.string(),
});
function validateObject(schema, input) {
    const result = schema.safeParse(input);
    if (result.error) {
        return result.error.errors.map((item) => `${item.path} => ${item.message}`);
    }
    else
        return [];
}
function initZod() {
    console.log("====================================");
    console.log(validateObject(DocumentSchema, {
        countryName: "united states",
        countryCode: "I",
        region: "america",
    }));
    console.log("====================================");
}
