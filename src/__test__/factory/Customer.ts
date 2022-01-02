import * as faker from "faker";
import { createFactory } from "./createFactory";
import { Prisma, Customer } from "@prisma/client";

export const CustomerDefaultAttributes: Prisma.CustomerCreateInput = {
  email: faker.datatype.string(),
  address: faker.datatype.string(),
  name: faker.datatype.string(),
  orders: {},
};

export const CustomerFactory = createFactory<
  Prisma.CustomerCreateInput,
  Customer
>("customer", CustomerDefaultAttributes);
