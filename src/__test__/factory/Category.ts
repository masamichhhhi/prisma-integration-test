import * as faker from "faker";
import { createFactory } from "./createFactory";
import { Prisma, Category } from "@prisma/client";

export const CategoryDefaultAttributes: Prisma.CategoryCreateInput = {
  name: faker.datatype.string(),
  products: {},
  Post: {},
};

export const CategoryFactory = createFactory<
  Prisma.CategoryCreateInput,
  Category
>("category", CategoryDefaultAttributes);
