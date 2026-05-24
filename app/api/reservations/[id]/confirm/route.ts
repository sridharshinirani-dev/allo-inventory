import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: any
) {

  try {

    const reservation =
      await prisma.reservation.update({

        where: {
          id: Number(params.id),
        },

        data: {
          status: "confirmed",
        },

      });

    return NextResponse.json(
      reservation
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}