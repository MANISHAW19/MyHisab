// lib/checkUser.js
import 'server-only';
import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) return null;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (existingUser) return existingUser;

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    const newUser = await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress || "",
      },
    });

    return newUser;
  } catch (error) {
    console.error("❌ Error in checkUser:", error);
    return null;
  }
};
