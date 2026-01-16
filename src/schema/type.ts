import { z, boolean, nativeEnum, object, string, float32 } from "zod";

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

export const LoginSchema = object({
  name:string().min(3).max(30),
  password:string().min(6),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const onBoardingSchema = object({
  name:string().min(3).max(30),
  email:string().email(),
  phone:string().min(10).max(15),
  address:string().min(10).max(100),
})

export type onBoardingType = z.infer<typeof onBoardingSchema>;

enum categoryEnum {
  ELECTRONICS,
  FURNITURE,
  HOME,
  CLOTHING,
  SPORTS,
  TOYS,
  BOOKS,
  FASHION,
  GROCERY,
  HOME_APPLIANCES,
}

export const productSchema = object ({
  name:string().min(3).max(50),
  about:string().min(10).max(500),
  price:float32(),
  category:nativeEnum(categoryEnum).default(categoryEnum.HOME),
})

export type productType = z.infer<typeof productSchema>;