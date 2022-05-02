import { Router } from "express";
import {
  getUserID,
  getUserMe,
  patchUserProfile,
} from "../Controllers/UserController";

export default function routeAPIUsers(router: Router) {
  router.get("/api/v1/users/@me", getUserMe);
  router.get("/api/v1/users/:userID", getUserID);
  router.patch("/api/v1/users/:userID", patchUserProfile);
}
