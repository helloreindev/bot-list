import { URL } from "url";
import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";

config();

/**
 * Gets the user's login information
 * @param req Express Request
 * @param res Express Response
 * @param next Express next function
 */
/* eslint-disable-next-line */
export function getLogin(req: Request, res: Response, next: NextFunction) {
  if (req.session.backUrl || req.query.backUrl) {
    req.session.backUrl = req.session.backUrl || (req.query.backUrl as string);
  } else if (req.headers.referer) {
    const parsed = new URL(req.headers.referer);

    if (parsed.hostname === process.env.BASE_URL) {
      req.session.backURL = parsed.pathname;
    }
  } else {
    req.session.backUrl = "/";
  }

  if (req.session.backUrl === "/index") {
    req.session.backUrl = "/";
  }
  next();
}

/**
 * Logout user
 * @param req Express Request
 * @param res Express Response
 */
export function getLogout(req: Request, res: Response) {
  req.session.destroy(() => {
    req.logout();
    res.redirect("/");
  });
}

/**
 * Get the callback URL
 * @param req Express Request
 * @param res Express Response
 */
export function getCallback(req: Request, res: Response) {
  const url = req.session.backUrl;

  if (url) {
    req.session.backUrl = null;
    res.redirect(url);
  } else {
    res.redirect("/");
  }
}
