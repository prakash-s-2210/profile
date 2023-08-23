import { Types } from "mongoose";

interface IEducationParams {
  name: string;
  location: string;
  qualification: string;
  startDate: string | Date;
  endDate: string | Date;
  present: boolean | Boolean;
  description: string;
  id: Types.ObjectId | undefined;
}

// Add a Work Experience
export async function createEducation({
  name,
  location,
  qualification,
  startDate,
  endDate,
  present,
  description,
  id,
}: IEducationParams) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/education/create`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        name,
        location,
        qualification,
        startDate,
        endDate,
        present,
        description,
        id,
      }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

// Update Work Experience
export async function editEducation({
  name,
  location,
  qualification,
  startDate,
  endDate,
  present,
  description,
  id,
}: IEducationParams) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/education/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        location,
        qualification,
        startDate,
        endDate,
        present,
        description,
        id,
      }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
