import { NextRequest, NextResponse } from "next/server";
  import prisma from "../../../lib/prisma";

  // Get a site by id
  export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const id = parseInt((await params).id, 10);

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid site id" }, { status: 400 });
      }

      const site = await prisma.sites.findUnique({
        where: { id },
        include: {
          user: {
            select: { name: true }
          }
        }
      });

      if (!site) {
        return NextResponse.json({ error: "Site not found" }, { status: 404 });
      }

      return NextResponse.json({ site });
    } catch (error) {
      console.error("Error fetching site:", error);
      return NextResponse.json({ error: "Could not fetch site" }, { status: 500 });
    }
  }

  // Delete a site by id
  export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const id = parseInt((await params).id, 10);

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid site id" }, { status: 400 });
      }

      const deletedSite = await prisma.sites.delete({
        where: { id },
      });

      return NextResponse.json({ message: "Site deleted", site: deletedSite });
    } catch (error) {
      console.error("Error deleting site:", error);
      return NextResponse.json(
        { error: "Could not delete site" },
        { status: 500 }
      );
    }
  }

  // Update a site by id
  export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const id = parseInt((await params).id, 10);
      const body = await request.json();

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid site id" }, { status: 400 });
      }

      const updatedSite = await prisma.sites.update({
        where: { id },
        data: {
          name: body.name,
          domain: body.domain,
          description: body.description,
          userId: body.userId,
        },
      });

      return NextResponse.json({ site: updatedSite });
    } catch (error) {
      console.error("Error updating site:", error);
      return NextResponse.json(
        { error: "Could not update site" },
        { status: 500 }
      );
    }
  }