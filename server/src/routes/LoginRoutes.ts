import { Request, Response, Router } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";

export function createLoginRoutes(userRepository: Repository<User>): Router {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    console.log("stuff");
  });

  router.post("/", async (req: Request, res: Response) => {
    console.log("stuff");
  });
  return router;
}
