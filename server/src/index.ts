import * as path from "path";
import * as passport from "passport";
import * as express from "express";
import { Router, Request, Response } from "express";
import * as session from "express-session";
import { createConnection } from "typeorm";
import { RosterEntry } from "./entity/RosterEntry";
import { User } from "./entity/User";
import { configurePassport } from "./passport";
import { createRosterEntryRoutes } from "./routes/RosterRoutes";
import { createUserRoutes } from "./routes/UserRoutes";

// Connect to the database
createConnection().then((connection) => {
  console.log("Successfully connected to database");
  // Provision "Repositories" to the various database entities
  // that we need to use.
  const userRepository = connection.getRepository(User);
  const rosterEntryRepository = connection.getRepository(RosterEntry);

  // Set up Express app
  const app = express();
  app.use(session({ secret: "foobarY33T", resave: true, saveUninitialized: false }));

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
  const api = Router();
  api.use("/users", createUserRoutes(userRepository));
  api.use("/residents", createRosterEntryRoutes(rosterEntryRepository));
  api.use("/test", (req, res) => res.send({ message: "woohoo api is up!" }));

  app.use("/api", api);

  // load the compiled React files, which will serve index.html and frontend JS bundles
  const reactPath = path.resolve(__dirname, "..", "..", "client", "dist");
  app.use(express.static(reactPath));

  // for all other routes, render index.html and let the React router handle it
  app.get("*", (_req, res) => {
    res.sendFile(path.join(reactPath, "index.html"));
  });

  // catch fatal server errors
  app.use((err: any, _req: Request, res: Response) => {
    const status = err.status || 500;
    if (status === 500) {
      console.error("The server errored when processing a request!");
      console.error(err);
    }

    res.status(status);
    res.send({
      status: status,
    });
  });

  configurePassport(passport, api, userRepository, rosterEntryRepository);

  // start express server
  const port = process.env.PORT || 2000;
  app.listen(port);
  console.log("Server listening on port " + port.toString());
});
