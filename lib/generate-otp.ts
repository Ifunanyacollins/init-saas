import { createHash } from "crypto";
import { totp } from "otplib";
import {prisma} from "@ulo/prisma/client";



interface VerifyEmailType {
    name?: string;
    email: string;
    language?: string;
  }

export const generateOTP = async ({ email,  name }: VerifyEmailType) => {
  
    const secret = createHash("md5")
      .update(email + process.env.PRETTYFAQ_ENCRYPTION_KEY )
      .digest("hex");
  
    totp.options = { step: 900 };
    const code = totp.generate(secret);

    
    await prisma.otp.upsert({
      where: {
        email,
      },
      update: {
        otp:code
      },
      create: {
        email,
       otp:code
      },
    })
    
 
  

  
    return  code
  };