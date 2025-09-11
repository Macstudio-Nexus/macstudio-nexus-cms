import { NextRequest, NextResponse } from "next/server";
  import prisma from "../../../lib/prisma";

  // Get a project by id
  export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const id = parseInt((await params).id, 10);

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
      }

      const project = await prisma.projects.findUnique({
        where: { id },
        include: {
          user: {
            select: { name: true }
          }
        }
      });

      if (!project) {
        return NextResponse.json({ error: "project not found" }, { status: 404 });
      }

      return NextResponse.json({ project });
    } catch (error) {
      console.error("Error fetching project:", error);
      return NextResponse.json({ error: "Could not fetch project" }, { status: 500 });
    }
  }

  // Delete a project by id
  export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const id = parseInt((await params).id, 10);

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
      }

      const deletedproject = await prisma.projects.delete({
        where: { id },
      });

      return NextResponse.json({ message: "project deleted", project: deletedproject });
    } catch (error) {
      console.error("Error deleting project:", error);
      return NextResponse.json(
        { error: "Could not delete project" },
        { status: 500 }
      );
    }
  }

  // Update a project by id
  export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const id = parseInt((await params).id, 10);
      const body = await request.json();

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
      }

      const updatedproject = await prisma.projects.update({
        where: { id },
        data: {
          title: body.title,
          domain: body.domain,
          description: body.description,
          type: body.type,
          siteId: body.siteId,
          user: body.user,
        },
      });

      return NextResponse.json({ project: updatedproject });
    } catch (error) {
      console.error("Error updating project:", error);
      return NextResponse.json(
        { error: "Could not update project" },
        { status: 500 }
      );
    }
  }