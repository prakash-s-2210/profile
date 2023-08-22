import { Types } from "mongoose";

interface IWorkExperienceParams {
  title: string;
  companyName: string;
  location: string;
  startDate: string | Date; 
  endDate: string | Date;
  present: boolean | Boolean;
  description: string;
  id: Types.ObjectId | undefined;
}

// Add a Work Experience
export async function createWorkExperience({
  title,
  companyName,
  location,
  startDate,
  endDate,
  present,
  description,
  id,
}: IWorkExperienceParams) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workExperience/create`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        title,
        companyName,
        location,
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
export async function editWorkExperience({
  title,
  companyName,
  location,
  startDate,
  endDate,
  present,
  description,
  id
}: IWorkExperienceParams) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workExperience/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        companyName,
        location,
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
