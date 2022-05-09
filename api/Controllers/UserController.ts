import axios from "axios";
import { config } from "dotenv";
import { Request, Response } from "express";
import { createUserModel } from "../Models/UserModel";
import setupMongoDB from "../MongoDBConnection";
import { createUserMongooseModel } from "../CreateMongooseModel";

const connection = setupMongoDB();
config();

/**
 * Get user by their ID
 * @param req Express Request
 * @param res Express Response
 */
export async function getUserID(req: Request, res: Response) {
  const model = createUserModel(connection);
  const userDoc = await model.findOne({ id: req.params.userID as string });
  const request = await axios.get(
    `https://discord.com/api/v9/users/${req.params.userID}`,
    {
      headers: {
        Authorization: `Bot ${process.env.CLIENT_TOKEN}`,
      },
    }
  );

  if (!request) {
    return res.status(404);
  }

  if (!userDoc) {
    return res.status(404);
  }

  res.send({
    user: {
      avatar: request.data.avatar,
      badges: userDoc.badges,
      bots: userDoc.bots,
      discriminator: request.data.discriminator,
      id: userDoc.id,
      joinedAt: userDoc.joinedAt,
      profile: userDoc.profile,
      username: request.data.username,
    },
  });
}

/**
 * Get self-user identify
 * @param req Express Request
 * @param res Express Response
 */
export async function getUserMe(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401);
  }

  const user = req.user;
  const model = createUserModel(connection);
  const userDoc = await model.findOne({ id: (user as any).id as string });

  // Create database for new requested user
  if (!userDoc) {
    createUserMongooseModel(connection, {
      badges: {
        admin: false,
        approval: false,
        approvalLvl2: false,
        contributor: false,
        hunter: true,
        hunterLvl2: false,
        lead: false,
        mod: false,
        supporter: false,
        verified: false,
      },
      bots: [],
      id: (user as any).id as string,
      joinedAt: new Date(),
      profile: {
        description: "This user has no description :(",
      },
    });
  }

  (user as any).accessToken = "[Redacted]";

  res.send({ user, profile: userDoc });
}

/**
 * Edit the user's profile
 * @param req Express Request
 * @param res Express Response
 */
export async function patchUserProfile(req: Request, res: Response) {
  if (req.headers.authorization !== process.env.AUTH_TOKEN) {
    return res.status(403).json({ message: "Not Allowed" });
  }

  if (!req.isAuthenticated()) {
    return res.status(401);
  }

  const model = createUserModel(connection);

  // Update body
  await model.findOneAndUpdate(
    { id: req.params.userID as string },
    {
      $set: {
        badges: req.body.badges,
        profile: { banner: req.body.banner, description: req.body.description },
      },
    }
  );

  res.send(req.user);
}
