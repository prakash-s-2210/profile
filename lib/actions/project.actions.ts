import { Types } from "mongoose";

// Create a Project
export async function createProject(
    title: string,
    technology: string,
    githubLink: string,
    picture: string,
    id: Types.ObjectId
  ) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/project/create`, {
        method: "POST",
        body: JSON.stringify({
          title,
          technology,
          githubLink,
          picture,
          id,
        }),
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  
  // Update Project
  export async function editProject(
    title: string,
    technology: string,
    githubLink: string,
    picture: string,
    id: Types.ObjectId
  ) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/project/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          technology,
          githubLink,
          picture,
          id,
        }),
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }