import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      orderBy: { id: "asc" }, // optional, orders by id
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Could not fetch users" }, { status: 500 });
  }
}
