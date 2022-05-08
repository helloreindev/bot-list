/* eslint-disable import/named */

import { Connection, Model, Schema } from "mongoose";

type BotStatus = "approved" | "queue" | "denied";

export interface UserBadges {
  admin: boolean;
  approval: boolean;
  approvalLvl2: boolean;
  contributor: boolean;
  hunter: boolean;
  hunterLvl2: boolean;
  lead: boolean;
  mod: boolean;
  supporter: boolean;
  verified: boolean;
}

export interface UserBots {
  addedAt?: Date;
  id?: string;
  status: BotStatus;
}

export interface UserProfile {
  banner?: string;
  description: string;
  discord?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface User {
  badges: UserBadges;
  bots: UserBots[];
  id: string;
  joinedAt: Date;
  profile: UserProfile;
}

const UserSchema = new Schema<User>({
  badges: {
    admin: {
      required: true,
      type: Boolean,
    },
    approval: {
      required: true,
      type: Boolean,
    },
    approvalLvl2: {
      required: true,
      type: Boolean,
    },
    contributor: {
      required: true,
      type: Boolean,
    },
    hunter: {
      required: true,
      type: Boolean,
    },
    hunterLvl2: {
      required: true,
      type: Boolean,
    },
    lead: {
      required: true,
      type: Boolean,
    },
    mod: {
      required: true,
      type: Boolean,
    },
    supporter: {
      required: true,
      type: Boolean,
    },
    verified: {
      required: true,
      type: Boolean,
    },
  },
  bots: {
    required: true,
    type: [Object],
  },
  id: {
    required: true,
    type: String,
  },
  joinedAt: {
    required: true,
    type: Date,
  },
  profile: {
    banner: {
      required: false,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    discord: {
      required: false,
      type: String,
    },
    github: {
      required: false,
      type: String,
    },
    twitter: {
      required: false,
      type: String,
    },
    website: {
      required: false,
      type: String,
    },
  },
});

export function createUserModel(connection: Connection): Model<User> {
  return connection.model("users", UserSchema);
}
