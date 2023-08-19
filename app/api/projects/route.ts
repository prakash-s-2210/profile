import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";

export const POST = async (request: Request) => {
  try {
    await connectToDB();

    const createdQuestion = new Profile({
      name: "Prakash S",
      profilePicture: "/assets/images/user.webp",
      headline: `Full stack dev at JS Mastery | CEG’22”`,
      location: "Chennai, TamilNadu, India",
      about: `Full Stack Developer 
      My life used to be a typical one - I followed the same path that most people around me did. I went to school, studied hard to get good marks, and aimed to get into a good college. My parents and society had certain expectations from me, and I didn't think much about changing my life's path at that time. I did well in school, but I must admit that I memorized most of the things and didn't retain the knowledge for long.
      
      When it was time to apply for college, I didn't get into the one I wanted through counseling, so I settled for another that I wasn't thrilled about. However, I didn't give up, and the next year, I applied again and finally got into my dream college. Due to my marks, I had limited options and chose mechanical engineering, which wasn't my preferred field. Nonetheless, I focused on getting the passing marks and tried to enjoy my college life as much as I could.
      
      After graduation, I landed a job in an IT company, which I worked hard to get. For two weeks, I prepared for the interview and finally succeeded in securing the job. For the first time in my life, I enjoyed my work and felt fulfilled. Unfortunately, due to the recession, I lost my job. However, instead of giving up, I decided to upskill myself with the latest technologies and learned MERN stack development.
      
      I am working as a Freelancer now side by side I am applying and attending interview for companies.

      Now I will eagerly waiting to be placed in a company as a full time employee where I can learn new things and achieve greater heights. I believe that life is all about learning, growing, and adapting to new challenges, and I'm excited to see where my journey takes me next.`,
      profession: "Software Engineer",
      dob: new Date(1999, 9, 22),
      gender: "Male",
      followings: 120,
      followers: 500,
      github: "https://github.com/prakash-s-2210",
      linkedin: "https://www.linkedin.com/in/prakash2210",
      facebook: "",
      instagram: "",
      dribble: "",
      behance: "",
      youtube: "",
      gmail: "sbprakash2210@gmail.com",
      visibility: ["followers and following", "xp", "achievement badges"],
      techStacks: [
        "HTML",
        "CSS",
        "JavaScript",
        "ReactJS",
        "NextJS",
        "NodeJS",
        "ExpressJS",
        "Mongodb",
        "SQl",
        "ASP.NET Web API",
        "Sanity",
      ],
      interests: ["Cycling", "Driving", "Cricket", "Travelling"],
      languages: ["English", "Tamil"],
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
