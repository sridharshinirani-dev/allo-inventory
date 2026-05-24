import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const warehouses = await prisma.warehouse.findMany();

  return NextResponse.json(warehouses);
}

export async function POST(req: Request) {
  const body = await req.json();

  const warehouse = await prisma.warehouse.create({
    data: {
      name: body.name,
      location: body.location,
    },
  });

  return NextResponse.json(warehouse);
}