import Passport from "passport";
import { Router } from "express";
import {
  getCallback,
  getLogin,
  getLogout,
} from "../Controllers/Discord/OAuthController";

export default function routeOAuth(router: Router, passport: typeof Passport) {
  router.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    getCallback
  );
  router.get(
    "/login",
    getLogin,
    passport.authenticate("discord", { prompt: "consent" })
  );
  router.get("/logout", getLogout);
}
