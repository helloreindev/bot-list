import { Endpoints } from "../Managers/Endpoints";
import Passport from "passport";
import { Router } from "express";
import {
  getCallback,
  getLogin,
  getLogout,
} from "../Controllers/Discord/OAuthController";

export default function routeOAuth(router: Router, passport: typeof Passport) {
  router.get(
    Endpoints.Callback,
    passport.authenticate("discord", { failureRedirect: "/" }),
    getCallback
  );
  router.get(
    Endpoints.Login,
    getLogin,
    passport.authenticate("discord", { prompt: "consent" })
  );
  router.get(Endpoints.Logout, getLogout);
}
