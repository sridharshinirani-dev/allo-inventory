import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET INVENTORY
export async function GET() {
  const inventory = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true,
    },
  });

  return NextResponse.json(inventory);
}

// ADD INVENTORY
export async function POST(req: Request) {
  const body = await req.json();

  const inventory = await prisma.inventory.create({
    data: {
      stock: body.stock,
      productId: body.productId,
      warehouseId: body.warehouseId,
    },
  });

  return NextResponse.json(inventory);
}