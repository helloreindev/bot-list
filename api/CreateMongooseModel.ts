/* eslint-disable import/named */

import { Connection } from "mongoose";
import { Bot, createBotModel } from "./Models/BotModel";
import { createUserModel, User } from "./Models/UserModel";

export function createBotMongooseModel(connection: Connection, body: Bot) {
  const model = createBotModel(connection);

  return model.create(body);
}

export function createUserMongooseModel(connection: Connection, body: User) {
  const model = createUserModel(connection);

  return model.create(body);
}
