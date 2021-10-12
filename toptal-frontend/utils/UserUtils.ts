import { User } from "./types";

export function isAdmin(user: User | undefined) {
  return user ? user.roles.filter((role) => role.name === "ADMIN").length > 0 : false;
}