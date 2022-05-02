import { config } from "dotenv";
import { Router } from "express";
import { Strategy } from "passport-discord";
import session from "express-session";
import passport from "passport";
import routeOAuth from "../Routes/OAuthRoute";
import routeAPIUsers from "../Routes/UserRoute";

config();

const router = Router();
const MemoryStore = require("memorystore")(session);
const bodyParser = require("body-parser");
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}/callback`,
      scope: ["identify", "guilds", "email"],
    },
    /* eslint-disable-next-line */
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);

router.use(
  session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: process.env.MEMORY_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

routeOAuth(router, passport);
routeAPIUsers(router);

export default router;
