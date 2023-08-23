import { Types } from "mongoose";

// Create a Playground
export async function createPlayground(
  title: string,
  technology: string | undefined,
  id: Types.ObjectId
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/playground/create`, {
      method: "POST",
      body: JSON.stringify({
        title,
        technology,
        id,
      }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

// Update Project
export async function editPlayground(
  title: string,
  technology: string | undefined,
  id: Types.ObjectId
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/playground/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        technology,
        id,
      }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
