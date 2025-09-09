import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


// Get a user by id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = parseInt((await params).id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Could not fetch user" }, { status: 500 });
  }
}

// Delete a user by id
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

