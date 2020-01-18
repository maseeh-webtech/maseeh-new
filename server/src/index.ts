import * as passport from "passport";
import * as express from "express";
import { Router } from "express";
import * as session from "express-session";
import { createConnection } from "typeorm";
import { RosterEntry } from "./entity/RosterEntry";
import { User } from "./entity/User";
import { configurePassport } from "./passport";
import { createRosterEntryRoutes } from "./routes/RosterRoutes";
import { createUserRoutes } from "./routes/UserRoutes";

// create typeorm connection
createConnection().then((connection) => {
  // Provision Repositories to the various database entities
  // that we need to use.
  const userRepository = connection.getRepository(User);
  const rosterEntryRepository = connection.getRepository(RosterEntry);

  // Set up Express app
  const app = express();
  app.use(session({ secret: "foobarY33T" }));

  // Set up post request parsing - urlencoded is needed for local auth strat
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set up passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Mount routes
  // The trick here is that the routers are created dynamically by the
  // function exported.  This allows a repository to be passed into the
  // routers' methods without issue.
  const apiRouter = Router();
  apiRouter.use("/users", createUserRoutes(userRepository));
  apiRouter.use("/residents", createRosterEntryRoutes(rosterEntryRepository));

  app.use("/api/v1", apiRouter);

  configurePassport(passport, app, userRepository, rosterEntryRepository);

  // start express server
  const port = process.env.PORT || 8081;
  app.listen(port);
  console.log("Server listening on port " + port.toString());
});
