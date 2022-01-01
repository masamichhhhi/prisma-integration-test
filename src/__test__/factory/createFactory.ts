import { PrismaClient } from "@prisma/client";
import prisma from "../../client";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

type FilterStartsWith<
  Union,
  Prefix extends string
> = Union extends `${Prefix}${infer _Property}` ? never : Union;

type ModelName = FilterStartsWith<keyof Awaited<PrismaClient>, "$">;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildPrismaIncludeFromAttrs(attrs: Record<string, any>) {
  const include = Object.keys(attrs).reduce((prev, curr) => {
    const value = attrs[curr];
    const isObject = typeof value === "object";
    const isRelation =
      isObject && Object.keys(value).find((v) => v.match(/connect|create/));

    if (isRelation) {
      prev[curr] = true;
    }

    return prev;
  }, Object.create(null));

  const hasInclue = Object.keys(include).length;
  return hasInclue ? include : undefined;
}

export const createFacory = <CreateInputType, ModelType>(
  modelName: ModelName,
  defaultAttributes: CreateInputType
) => {
  return {
    create: async (attrs: Partial<CreateInputType>): Promise<ModelType> => {
      const obj: CreateInputType = {
        ...defaultAttributes,
        ...attrs,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: Record<string, any> = {};
      const includes = buildPrismaIncludeFromAttrs(attrs);

      if (includes) options.include = includes;

      return await prisma[modelName as string].create({
        data: { ...obj },
        ...options,
      });
    },
  };
};
