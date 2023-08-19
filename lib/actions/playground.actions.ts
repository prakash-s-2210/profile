import { Types } from "mongoose";

// Create a Playground
export async function createPlayground(
  title: string,
  technology: string,
  id: Types.ObjectId
) {
  try {
    const res = await fetch("http://localhost:3000/api/playground/create", {
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
  technology: string,
  id: Types.ObjectId
) {
  try {
    const res = await fetch(`http://localhost:3000/api/playground/${id}`, {
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
