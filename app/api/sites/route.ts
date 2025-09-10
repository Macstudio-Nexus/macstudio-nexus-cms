import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

// Add new site
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.domain || !body.userId || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: name, domain, userId, and description are required" },
        { status: 400 }
      );
    }

    // Ensure userId is a number
    const userId = parseInt(body.userId);
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid userId: must be a valid number" },
        { status: 400 }
      );
    }

    const newSite = await prisma.sites.create({
      data: {
        name: body.name,
        domain: body.domain,
        userId: userId,
        description: body.description
      }
    });

    return NextResponse.json({ sites: newSite });
  } catch (error) {
    console.error("Error creating site:", error);
    
    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: "A site with this domain already exists" },
          { status: 409 }
        );
      }
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: "Invalid user ID: user does not exist" },
          { status: 400 }
        );
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Get all sites
export async function GET() {
  try {
    const sites = await prisma.sites.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: { id: "asc" }, // optional, orders by id
    });

    return NextResponse.json({ sites });
  } catch (error) {
    console.error("Error fetching sites:", error);
    return NextResponse.json({ error: "Could not fetch sites" }, { status: 500 });
  }
}
