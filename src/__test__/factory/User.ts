import * as faker from "faker";
import { createFactory } from "./createFactory";
import { Prisma, User } from "@prisma/client";

export const UserDefaultAttributes: Prisma.UserCreateInput = {
  name: faker.datatype.string(),
  posts: {},
  profile: {},
};

export const UserFactory = createFactory<Prisma.UserCreateInput, User>(
  "user",
  UserDefaultAttributes
);
