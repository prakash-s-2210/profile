import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import Playground from "@/mongodb/playground.model";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { title, technology, id } = await request.json();

  try {
    await connectToDB();

    const updatedPlayground = await Playground.findOneAndUpdate(
      { _id: id },
      { title, technology, createdAt: new Date(), updatedAt: new Date() }
    ).exec();
    return NextResponse.json("Successfully updated the Playground", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating Playground: ${error}` },
      { status: 500 }
    );
  }
};
