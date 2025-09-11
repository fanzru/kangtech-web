import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const userCount = await prisma.user.count();

    return NextResponse.json({
      hasAdmin: userCount > 0,
    });
  } catch (error) {
    console.error("Check admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
