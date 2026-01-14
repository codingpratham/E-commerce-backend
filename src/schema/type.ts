import { z, boolean, nativeEnum, object, string } from "zod";

enum authRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
export const RegisterSchema = object({
    name:string().min(3).max(30),
  password:string().min(6),
  authType:nativeEnum(authRole).default(authRole.USER),
  isBoarded:boolean().default(false),
})

export type RegisterType = z.infer<typeof RegisterSchema>;