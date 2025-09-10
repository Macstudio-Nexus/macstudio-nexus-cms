import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

// Add new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newProject = await prisma.projects.create({
      data: {
        title: body.title,
        description: body.description || null,
        domain: body.domain || null,
        type: body.type,
        userId: body.userId,
        siteId: body.siteId || null,
      }
    });

    return NextResponse.json({ project: newProject });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
