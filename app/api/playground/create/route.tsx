import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";
import Playground from "@/mongodb/playground.model";

export const POST = async (request: Request) => {
  const { title, technology, id } = await request.json();

  try {
    await connectToDB();

    const createdPlayground = await Playground.create({
      title,
      technology,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await Profile.findByIdAndUpdate(id, {
      $push: { playgrounds: createdPlayground._id },
    }).exec();

    return NextResponse.json(createdPlayground, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to create a Playground: ${error}` },
      { status: 500 }
    );
  }
};
