"use server";

import { cookies } from "next/headers";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function getLocations() {
  return await db.location.findMany();
}

export async function setSelectedLocation(value: string) {
  cookies().set("locationId", value);
  revalidatePath("/", "page");
}
