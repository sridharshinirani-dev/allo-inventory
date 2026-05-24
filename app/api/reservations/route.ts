import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// =========================
// GET RESERVATIONS
// =========================

export async function GET() {

  const reservations =
    await prisma.reservation.findMany({

      include: {
        product: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(
    reservations
  );
}

// =========================
// CREATE RESERVATION
// =========================

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      productId,
      quantity,
      expiresAt,
    } = body;

    // =========================
    // EXPIRY VALIDATION
    // =========================

    const currentDate =
      new Date();

    const expiry =
      new Date(expiresAt);

    if (
      expiry <
      currentDate
    ) {

      return NextResponse.json(
        {
          error:
            "Reservation expired",
        },
        {
          status: 410,
        }
      );
    }

    // =========================
    // SERIALIZABLE TRANSACTION
    // =========================

    const reservation =
      await prisma.$transaction(

        async (tx) => {

          // =========================
          // FIND PRODUCT
          // =========================

          const product =
            await tx.product.findUnique({

              where: {
                id: productId,
              },
            });

          // =========================
          // PRODUCT NOT FOUND
          // =========================

          if (!product) {

            throw new Error(
              "Product not found"
            );
          }

          // =========================
          // AVAILABLE STOCK
          // =========================

          const availableStock =
            product.quantity -
            product.reserved;

          // =========================
          // 409 CONFLICT
          // =========================

          if (
            quantity >
            availableStock
          ) {

            throw new Error(
              "409"
            );
          }

          // =========================
          // UPDATE RESERVED STOCK
          // =========================

          await tx.product.update({

            where: {
              id: productId,
            },

            data: {

              reserved: {
                increment:
                  quantity,
              },
            },
          });

          // =========================
          // CREATE RESERVATION
          // =========================

          const newReservation =
            await tx.reservation.create({

              data: {

                productId,

                quantity,

                expiresAt:
                  expiry,

                // =========================
                // DEFAULT STATUS
                // =========================

                status:
                  "pending",
              },

              include: {
                product: true,
              },
            });

          return newReservation;
        },

        {
          isolationLevel:
            "Serializable",
        }
      );

    return NextResponse.json(
      reservation
    );

  } catch (error: any) {

    // =========================
    // 409 ERROR HANDLING
    // =========================

    if (
      error.message ===
      "409"
    ) {

      return NextResponse.json(
        {
          error:
            "Not enough stock available",
        },
        {
          status: 409,
        }
      );
    }

    // =========================
    // GENERAL ERROR
    // =========================

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}