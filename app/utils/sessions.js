// app/utils/sessions.js
import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = "super-secret-string" // this is just for example, please use process.env.SESSION_SECRET;

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: "production", //process.env.NODE_ENV ===
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  },
});
