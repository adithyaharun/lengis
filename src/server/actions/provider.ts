"use server";
import { cookies } from "next/headers";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function getProviders() {
  return await db.provider.findMany();
}

export async function setSelectedProvider(value: string) {
  cookies().set("providerId", value);
  revalidatePath("/", "page");
}
