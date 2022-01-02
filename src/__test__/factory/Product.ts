import * as faker from "faker";
import { createFactory } from "./createFactory";
import { Prisma, Product } from "@prisma/client";

export const ProductDefaultAttributes: Prisma.ProductCreateInput = {
  name: faker.datatype.string(),
  description: faker.datatype.string(),
  price: faker.datatype.number(),
  sku: faker.datatype.number(),
  orderDetails: {},
  category: {},
};

export const ProductFactory = createFactory<Prisma.ProductCreateInput, Product>(
  "product",
  ProductDefaultAttributes
);
