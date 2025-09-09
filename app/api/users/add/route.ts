import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

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
