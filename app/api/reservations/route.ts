import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    include: {
      product: true,
    },
  });

  return NextResponse.json(reservations);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.findUnique({
    where: {
      id: body.productId,
    },
  });

  if (!product) {
    return NextResponse.json({
      error: "Product not found",
    });
  }

  if (product.quantity < body.quantity) {
    return NextResponse.json({
      error: "Not enough stock",
    });
  }

  await prisma.product.update({
    where: {
      id: body.productId,
    },
    data: {
      quantity: product.quantity - body.quantity,
      reserved: product.reserved + body.quantity,
    },
  });

  const reservation = await prisma.reservation.create({
    data: {
      productId: body.productId,
      quantity: body.quantity,
      expiresAt: new Date(body.expiresAt),
    },
  });

  return NextResponse.json(reservation);
}