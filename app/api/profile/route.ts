import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";

export const GET = async (request: Request) => {
  try {
    await connectToDB();
    const profileData = await Profile.find({}).exec();
    return NextResponse.json(profileData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch all Profile Information" },
      { status: 500 }
    );
  }
};
