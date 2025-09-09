import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// Type for the expected request body
interface AddUserBody {
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  company_name?: string;
  business_type?: string;
  role_id: number;
}

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const body: AddUserBody = await req.json();
    const { name, email, password, phone_number, company_name, business_type, role_id } = body;

    // Validate required fields
    if (!name || !email || !password || !role_id) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, password, role_id" },
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
        phone_number,
        company_name,
        business_type,
        role_id,
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
