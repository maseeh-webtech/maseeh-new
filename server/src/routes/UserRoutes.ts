import { Request, Response, Router } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";

export function createUserRoutes(userRepository: Repository<User>): Router {
  const router = Router();

  router.get("/userinfo", async (req: Request, res: Response) => {
    if (req.user == null) {
      res.status(403).send({message: "Error: you must be logged in to access this"});
    } else {
      res.send(req.user);
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    return userRepository.find();
  });

  router.get("/:id", async (req: Request, res: Response) => {
    return userRepository.findOne(req.params.id);
  });

  router.get("/:id/groups", async (req: Request, res: Response) => {
    return (await userRepository.findOne(req.params.id)).groups;
  });

  router.post("/", async (req: Request, res: Response) => {
    const user = await userRepository.create(req.body);
    return userRepository.save(user);
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const user = await userRepository.findOne(req.params.id);
    await userRepository.merge(user, req.body);
    return userRepository.save(user);
  });

  router.delete("/:id", async (req: any, res: Response) => {
    return userRepository.remove(req.params.id);
  });

  return router;
}
