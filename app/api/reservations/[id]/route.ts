import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  context: any
) {
  const params = await context.params;

  const reservationId = Number(params.id);

  const body = await request.json();

  const reservation =
    await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
    });

  if (!reservation) {
    return NextResponse.json({
      message: "Reservation not found",
    });
  }

  // CONFIRM
  if (body.status === "confirmed") {
    const updatedReservation =
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: "confirmed",
        },
      });

    return NextResponse.json(
      updatedReservation
    );
  }

  // RELEASE
  if (body.status === "released") {
    // RETURN STOCK
    await prisma.product.update({
      where: {
        id: reservation.productId,
      },
      data: {
        quantity: {
          increment:
            reservation.quantity,
        },
      },
    });

    const updatedReservation =
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: "released",
        },
      });

    return NextResponse.json(
      updatedReservation
    );
  }

  return NextResponse.json({
    message: "Invalid status",
  });
}