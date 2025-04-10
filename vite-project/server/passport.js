import dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";
import { db } from "./initDb.js";

dotenv.config();
const { SECRET = "" } = process.env;

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = await db.oneOrNone(
        `SELECT * FROM users WHERE id=$1`,
        payload.id
      );
      try {
        return user ? done(null, user) : done(new Error("User not found"));
      } catch (error) {
        done(error);
      }
    }
  )
);
