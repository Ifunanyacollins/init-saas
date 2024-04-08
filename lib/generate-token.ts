import { randomBytes } from "crypto";
import {prisma} from "@ulo/prisma/client";



interface VerifyEmailType {
  name?: string;
  email: string;

}

const WEBAPP_URL = process.env.NEXTAUTH_WEBURL
export const generateToken = async ({ email }: VerifyEmailType) => {
    const token = randomBytes(32).toString("hex");
 
  
    await prisma.verificationToken.create({
      data: {
       email,
        token,
        expires: new Date(Date.now() + 24 * 3600 * 1000), // +1 day
      },
    });
  
    const params = new URLSearchParams({
      token,
    });
  
   
  
    return  `${WEBAPP_URL}/api/verify-email?${params.toString()}`
  };