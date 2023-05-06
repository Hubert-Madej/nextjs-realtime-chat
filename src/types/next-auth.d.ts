import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;
type UserImage = string | null | undefined;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    image: UserImage;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      image: UserImage;
    };
  }
}
