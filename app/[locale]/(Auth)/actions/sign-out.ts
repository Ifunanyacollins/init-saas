"use server"

import { signOut } from "@ulo/auth"

export async function logout(){
  return signOut({redirectTo:"/sign-in"})
}