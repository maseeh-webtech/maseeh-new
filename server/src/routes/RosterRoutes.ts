import { Request, Response, Router } from "express";
import { Repository } from "typeorm";
import { RosterEntry } from "../entity/RosterEntry";
import { Permissions } from "../util";
import { User } from "../entity/User";

export function createRosterEntryRoutes(rosterEntryRepository: Repository<RosterEntry>): Router {
  const router = Router();

  router.get("/all", async (req: Request, res: Response) => {
    if (req.user !== undefined && (req.user as User).hasPermission(Permissions.readRoster)) {
      const entries = await rosterEntryRepository.find();
      const output = new Map<number, RosterEntry>();
      entries.forEach((element) => {
        output[element.id] = element;
      });
      res.send(output);
    } else {
      res.status(403).send({ error: "Insufficient permissions" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    if (req.user !== undefined && (req.user as User).hasPermission(Permissions.writeRoster)) {
      if (req.body instanceof RosterEntry) {
        const entry = rosterEntryRepository.create(req.body);
        return rosterEntryRepository.save(entry);
      } else {
        res.status(400).send({ error: "Bad Request" });
      }
    } else {
      res.status(403).send({ error: "Insufficient permissions" });
    }
  });

  router.put("/", (req: Request, res: Response) => {
    if (req.user !== undefined && (req.user as User).hasPermission(Permissions.writeRoster)) {
      if (req.body instanceof RosterEntry) {
        const entry = rosterEntryRepository.findOne(req.params.id).then(() => {
          rosterEntryRepository.merge(entry, req.body);
          return rosterEntryRepository.save(entry);
        });
      } else {
        res.status(400).send({ error: "Bad Request" });
      }
    } else {
      res.status(403).send({ error: "Insufficient permissions" });
    }
  });

  router.delete("/:id", async (req: any, res: Response) => {
    if (req.user !== undefined && (req.user as User).hasPermission(Permissions.writeRoster)) {
      if (req.body instanceof RosterEntry) {
        return rosterEntryRepository.remove(req.params.id);
      } else {
        res.status(400).send({ error: "Bad Request" });
      }
    } else {
      res.status(403).send({ error: "Insufficient permissions" });
    }
  });

  return router;
}
