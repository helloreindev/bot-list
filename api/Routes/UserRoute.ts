import { Endpoints } from "../Managers/Endpoints";
import { Router } from "express";
import {
  getUserID,
  getUserMe,
  patchUserProfile,
} from "../Controllers/UserController";

export default function routeAPIUsers(router: Router) {
  router.get(Endpoints.User("@me"), getUserMe);
  router.get(Endpoints.User(":userID"), getUserID);
  router.patch(Endpoints.User(":userID"), patchUserProfile);
}
