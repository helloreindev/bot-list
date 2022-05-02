/* eslint-disable import/named */

import { Connection } from "mongoose";
import { createUserModel, User } from "./Models/UserModel";

export function createUserMongooseModel(connection: Connection, body: User) {
  const model = createUserModel(connection);

  return model.create(body);
}
