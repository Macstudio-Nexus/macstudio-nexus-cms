import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

// Create a new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.users.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        phoneNumber: body.phoneNumber || null,
        companyName: body.companyName || null,
        businessType: body.businessType || null,
        roleId: body.roleId,
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Get all users
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