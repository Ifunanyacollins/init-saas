"use server";
import {prisma} from "@ulo/prisma/client";
import {signUpAnsSignInSchema} from "../zodSchema";
import { hashPassword } from "@ulo/lib/hash-password";
import { generateToken  } from "@ulo/lib/generate-token";
import { redirect } from "next/navigation";

export async function signUp(prevState: { message: string; success: boolean}, formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const businessName = formData.get("businessName")?.toString()!
  const parse = signUpAnsSignInSchema.safeParse({email, password})


  if(!parse.success){
      return  { message: "Email or password is missing", success: false }
  }
  const userEmail =  email?.toString().toLowerCase()!
  const hashedPassword = await hashPassword(password as string);

  const isUserExisting = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })


  if(isUserExisting){
    return  { message: "Email is already taken", success: false }
 }


 await prisma.user.create({
  data: {
      email: userEmail,
      password: hashedPassword,
     role: "ADMIN"
    }
})

const org = await prisma.org.create({data:{
  name:businessName
}})

await prisma.user.update({
  where: {
    email: userEmail,
  },
  data: {
      orgId: org.id,
    },
});

const verificationUrl = await generateToken({
email: userEmail,
})

//send email here



 return  redirect(`/email-sent?email=${userEmail}`)
}
