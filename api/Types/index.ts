/* eslint-disable-next-line */
import { Session } from "express-session";

declare module "express-session" {
  interface Session {
    backUrl: string | null;
    backURL: string;
  }
}
