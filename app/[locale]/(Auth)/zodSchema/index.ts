import { z } from "zod";

export const createOrgSchema = z.object({
    name: z.string(),
  
  });


  export const signUpAnsSignInSchema = z.object({
    email: z.string(),
    password: z.string()
  });

  export const VerifyTokenSchema = z.object({
    token: z.string(),
  });