import { z } from "zod";

// creating a schema for strings
// const mySchema = z.string();

// // parsing
// mySchema.parse("tuna"); // => "tuna"
// mySchema.parse(12); // => throws ZodError

// // "safe" parsing (doesn't throw error if validation fails)
// mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
// mySchema.safeParse(12); // => { success: false; error: ZodError }

export const UserScehma = z.object({
  url: z.string().min(8).optional(),
  name: z.string().max(20),
  age: z.number().min(2).max(3).optional(),
});

const DocumentSchema = z.object({
  countryName: z.string().max(5),
  countryCode: z.string().max(3).min(3),
  region: z.string(),
});

export type Country = z.infer<typeof DocumentSchema>;

function validateObject<T>(schema: z.ZodSchema, input: T): Array<string> {
  const result = schema.safeParse(input);
  if (result.error) {
    return result.error.errors.map((item) => `${item.path} => ${item.message}`);
  } else return [];
}

export function initZod() {
  console.log("====================================");
  console.log(
    validateObject<Country>(DocumentSchema, {
      countryName: "united states",
      countryCode: "I",
      region: "america",
    })
  );
  console.log("====================================");
}
export type ZodBasedUser = z.infer<typeof UserScehma>;
