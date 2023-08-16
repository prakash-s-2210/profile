import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";

export const POST = async (request: Request) => { 
  const { title, technology, githubLink, picture } = await request.json();

  try {
    await connectToDB();

    const createdQuestion = new Profile({
      projects: [{
        title,
        technology,
        githubLink,
        picture
      }]
    });
    await createdQuestion.save();
    
    
    return NextResponse.json(createdQuestion, { status: 201 });
  } catch (error) {

    return NextResponse.json(
      { message: "Failed to create a Question" },
      { status: 500 }
    );
  }
};