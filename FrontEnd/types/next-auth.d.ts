// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// Extend the Session object
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user?: DefaultUser & {
      name?: string | null;
      email?: string | null;
      role?: string | null; // custom role
    };
  }

  interface User extends DefaultUser {
    role?: string | null; // add role to User
  }
}

// Extend the JWT object
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    role?: string | null;
  }
}
