import z from "zod";

const addressSchema = z.object({
  country: z.string(),
  city: z.string(),
  province: z.string(),
  street: z.string().optional(),
});

const orderSchema = z.object({
  orderIteam: z.array(
    z.object({
      product: z.string({ error: "product is required" }),
    }),
  ),
  totalPrice: z.number({ error: "total price is required" }).min(0),
  shippingAddress: addressSchema,
});

export { orderSchema };
