import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      category: body.category,
      quantity: Number(body.quantity),
      price: Number(body.price),
      reserved: 0,
    },
  });

  return NextResponse.json(product);
}