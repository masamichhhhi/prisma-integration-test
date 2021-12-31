import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy, mockReset } from "jest-mock-extended";
import prisma from "./client";

export type Context = {
  prisma: PrismaClient;
};

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
