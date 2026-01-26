import z from "zod";
const cartSchema = z.object({
  Items: z.array(z.object({})),
});

export { cartSchema };
