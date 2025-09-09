import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const user = await prisma.users.create({ data });
  return new Response(JSON.stringify(user), { status: 200 });
}
