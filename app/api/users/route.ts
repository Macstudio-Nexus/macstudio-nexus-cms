import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// Type for the expected request body
interface AddUserBody {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  companyName?: string;
  businessType?: string;
  roleId: number;
}

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const body: AddUserBody = await req.json();
    const { name, email, password, phoneNumber, companyName, businessType, roleId } = body;

    // Validate required fields
    if (!name || !email || !password || !roleId) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, password, roleId" },
        { status: 400 }
      );
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        companyName,
        businessType,
        roleId,
      },
    });

    // Return the newly created user
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
