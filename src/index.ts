import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import client from "./client";

const app = express();
const router = express.Router();

router.post("/users", async (_req: Request, res: Response) => {
  await client.user.create({
    data: {
      name: "test",
    },
  });

  res.send({ message: "success" });
});

router.get("/users", async (_req: Request, res: Response) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();
  console.log(users);

  res.send(users);
});
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port);
console.log("listening on port " + port);
