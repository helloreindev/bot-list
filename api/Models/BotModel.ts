import { Connection, Model, Schema } from "mongoose";

export type BotReviewCount = 0 | 1 | 2 | 3;
export type BotState = "abandoned" | "approved" | "denied" | "queued";
export type BotTags = "Moderation" | "Utility";

export interface BotOwner {
  primary: string;
  additional?: string[];
}

export interface BotSocial {
  github?: string;
  twitter?: string;
  website?: string;
  youtube?: string;
}

export interface BotStats {
  server: number;
  shard: number;
  user: number;
}

export interface Bot {
  addedAt: Date;
  authToken?: string;
  avatar: string;
  description: string;
  featured?: boolean;
  id: string;
  invite?: string;
  nsfw?: boolean;
  owner: BotOwner;
  prefix?: string;
  preview: string;
  promoted?: boolean;
  queueNote?: string;
  reviewCount: BotReviewCount;
  social?: BotSocial;
  state: BotState;
  stats?: BotStats;
  tags: BotTags[];
  verified?: boolean;
  vote: number;
}

const BotSchema = new Schema<Bot>({
  addedAt: {
    required: true,
    type: Date,
  },
  authToken: {
    type: String,
  },
  avatar: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  featured: {
    default: false,
    type: Boolean,
  },
  id: {
    required: true,
    type: String,
  },
  invite: {
    type: String,
  },
  nsfw: {
    default: false,
    type: Boolean,
  },
  owner: {
    required: true,
    type: Object,
  },
  prefix: {
    type: String,
  },
  preview: {
    required: true,
    type: String,
  },
  promoted: {
    default: false,
    type: Boolean,
  },
  queueNote: {
    type: String,
  },
  reviewCount: {
    default: 0,
    required: true,
    type: Number,
  },
  social: {
    type: Object,
  },
  state: {
    required: true,
    type: String,
  },
  stats: {
    type: Object,
  },
  tags: {
    default: [],
    required: true,
    type: [String],
  },
  verified: {
    default: false,
    type: Boolean,
  },
  vote: {
    default: 0,
    type: Number,
  },
});

export function createBotModel(connection: Connection): Model<Bot> {
  return connection.model("bots", BotSchema);
}
