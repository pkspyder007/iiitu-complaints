import { z } from "zod"
import { USER_ROLES } from "../models/user"

const createUserValidator = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    role: z.nativeEnum(USER_ROLES).optional(),
    password: z.string().min(6),
    confirmPassword: z.string(),
    phone: z.number(),
    rollno: z.number().min(5)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }).refine((data) => data.email.split('@')[1] === "iiitu.ac.in", {
    message: "Only insitute id is allowed",
    path: ["email"]
  });

const createComplainValidator = z.object({
  userId: z.string().min(1),
  complaint: z.string().min(10),
  type: z.string().min(1),
  links: z.string().array()
})

export const validtors = {
    createUser: createUserValidator,
    createComplain: createComplainValidator
}