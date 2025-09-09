import { NextRequest, NextResponse } from "next/server";
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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = parseInt((await params).id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const deletedUser = await prisma.users.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Could not delete user" },
      { status: 500 }
    );
  }
}

