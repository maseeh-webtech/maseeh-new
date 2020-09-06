import * as local from "passport-local";
import * as oidc from "passport-openidconnect";
import { Request, Response, Router } from "express";
import { Repository } from "typeorm";
import { RosterEntry } from "./entity/RosterEntry";
import { User } from "./entity/User";
// @ts-ignore: this config file is not checked in to git
import * as config from "./oidc_config.json";
import { Env } from "./util";

export function configurePassport(
  passport,
  router: Router,
  userRepository: Repository<User>,
  rosterEntryRepository: Repository<RosterEntry>
) {
  // If deployed to a server, set up OIDC
  if (process.env.NODE_ENV === Env.Prod) {
    passport.use(
      new oidc.Strategy(config, (iss, sub, profile, done) => {
        // Look for user's OpenID in our User DB
        userRepository.findOne({ where: { openid: sub } }).then(
          (user: User) => {
            console.log("Looked for users.");
            console.log("User: " + user);
            if (user && user.active) {
              done(null, user);
            } else if (!user.active) {
              done(null, false, { message: "User is marked as inactive" });
            } else {
              // Create new user from roster entry if person is in roster
              console.log("Checking the roster");
              rosterEntryRepository
                .findOne({ where: { username: profile._json.preferred_username } })
                .then(
                  (rosterEntry: RosterEntry) => {
                    if (rosterEntry) {
                      console.log("Found this in the roster: " + rosterEntry);
                      user = new User();
                      user.name = rosterEntry.name;
                      user.username = rosterEntry.username;
                      user.active = true;
                      user.room = rosterEntry.room;
                      user.openid = sub;
                      user.rosterEntry = rosterEntry;
                      userRepository.save(user).then(
                        (v: User) => {
                          done(null, user);
                        },
                        (err) => {
                          console.log("Database ran into an error while trying to create new user");
                          done(err);
                        }
                      );
                    } else {
                      console.log("Failed to locate user in roster");
                      done(null, false, { message: "Failed to locate user in roster" });
                    }
                  },
                  (reason) => {
                    console.log("Database ran into an error while trying to look up user");
                    done(reason);
                  }
                );
            }
          },
          (reason) => {
            console.log("Database lookup ran into an error");
            done(reason);
          }
        );
      })
    );

    // Set up routes for real OIDC auth
    router.get("/login", (req: Request, res: Response, next: Function) => {
      console.log("Attempting to authenticate.");
      passport.authenticate("openidconnect", {
        successRedirect: "/",
      })(req, res, next);
    });

    router.get("/logout", (req: Request, res: Response) => {
      console.log("Logging out...");
      req.logout();
      res.redirect("/");
    });
  } else if (process.env.NODE_ENV === Env.Dev) {
    // Case where server is running locally, set up hardcoded login
    passport.use(
      new local.Strategy((username, password, done) => {
        console.log("using dev login");
        userRepository.findOne({ where: { username: "dev" } }).then(
          (user: User) => {
            console.log("found user", user);
            if (user) {
              done(null, user);
            } else {
              done(null, false, { message: "Dev login failed." });
            }
          },
          (reason) => {
            console.log("Database lookup ran into an error");
            done(reason);
          }
        );
      })
    );

    // Set up routes for basic DB auth
    router.get("/login", (req, res, next) => {
      userRepository.findOne({ where: { username: "dev" } }).then((user: User) => {
        if (user) {
          req.user = user;
          console.log("Successfully completed dev login!");
          res.send(req.user);
        } else {
          console.log("dev login failed");
          res.status(500).send({ message: "dev login failed" });
        }
      });
    });

    router.get("/logout", (req: Request, res: Response) => {
      console.log("Logging out...");
      req.logout();
      res.redirect("/");
    });
  }

  // Methods to populate req.user in Express
  passport.serializeUser((user, done) => {
    console.log(`Serializing: ${JSON.stringify(user)}`);
    done(null, user.openid);
  });

  passport.deserializeUser((id, done) => {
    console.log("Deserializing id:");
    console.log(JSON.stringify(id));
    userRepository.findOne({ where: { openid: id } }).then(
      (found: User) => {
        if (found) {
          console.log(`Deserialized: ${JSON.stringify(found)}`);
          done(null, found);
        } else {
          done(null, false, { message: "Could not find user" });
        }
      },
      (reason) => {
        done(reason);
      }
    );
  });
}
