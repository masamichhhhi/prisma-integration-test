import { createOrder, Customer, OrderInput } from "../create-order";
import { CustomerFactory } from "./factory/Customer";
import prisma from "../client";

beforeAll(async () => {
  await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: "Wand",
      },
      {
        id: 2,
        name: "Broomstick",
      },
    ],
  });

  console.log("✨ 2 categories successfully created!");

  await prisma.product.createMany({
    data: [
      {
        name: 'Holly, 11", phoenix feather',
        description: "Harry Potters wand",
        price: 100,
        sku: 1,
        categoryId: 1,
      },
      {
        name: "Nimbus 2000",
        description: "Harry Potters broom",
        price: 500,
        sku: 2,
        categoryId: 2,
      },
    ],
  });

  console.log("2 products successfully created");

  // await prisma.customer.create({
  //   data: {
  //     name: "Harry Potter",
  //     email: "harry@hogwarts.io",
  //     address: "4 Privet Drive",
  //   },
  // });

  await CustomerFactory.create({});

  // console.log(dummyCustomer);

  console.log("1 customer successfully created!");
});

afterAll(async () => {
  const deleteOrderDetails = prisma.orderDetails.deleteMany();
  const deleteProduct = prisma.product.deleteMany();
  const deleteCategory = prisma.category.deleteMany();
  const deleteCustomerOrder = prisma.customerOrder.deleteMany();
  const deleteCustomer = prisma.customer.deleteMany();

  await prisma.$transaction([
    deleteOrderDetails,
    deleteProduct,
    deleteCategory,
    deleteCustomerOrder,
    deleteCustomer,
  ]);

  await prisma.$disconnect();
});

it("should create 1 new customer with 1 order", async () => {
  const customer: Customer = {
    id: 2,
    name: "Hermione Granger",
    email: "hermione@hogwarts.io",
    address: "2 Hampstead Heath",
  };

  const order: OrderInput = {
    customer,
    productId: 1,
    quantity: 1,
  };

  await createOrder(order);

  const newCustomer = await prisma.customer.findUnique({
    where: {
      email: customer.email,
    },
  });

  const newOrder = await prisma.customerOrder.findFirst({
    where: {
      customer: {
        email: customer.email,
      },
    },
  });

  expect(newCustomer).toEqual(customer);
  expect(newOrder).toHaveProperty("customerId", 2);
});

it("should create 1 order with an existing customer", async () => {
  const customer: Customer = {
    email: "harry@hogwarts.io",
  };

  const order: OrderInput = {
    customer,
    productId: 1,
    quantity: 1,
  };

  await createOrder(order);

  const newOrder = await prisma.customerOrder.findFirst({
    where: {
      customer: {
        email: customer.email,
      },
    },
  });

  expect(newOrder).toHaveProperty("customerId", 1);
});

it("should show 'Out of stock' message if productId doesn't exist", async () => {
  const customer: Customer = {
    email: "harry@hogwarts.io",
  };

  const order: OrderInput = {
    customer,
    productId: 3,
    quantity: 1,
  };

  await expect(createOrder(order)).resolves.toEqual(new Error("Out of stock"));
});
