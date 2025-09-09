import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    const id = parseInt(idParam, 10);

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
