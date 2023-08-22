import { Types } from "mongoose";

// Create a Certificate
export async function createCertificate(
  title: string,
  technology: string,
  issuedDate: Date | string,
  credentials: string,
  id: Types.ObjectId
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/certificate/create`, {
      method: "POST",
      body: JSON.stringify({
        title,
        technology,
        issuedDate,
        credentials,
        id,
      }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

// Update Certificate
export async function editCertificate(
  title: string,
  technology: string,
  issuedDate: Date | string,
  credentials: string,
  id: Types.ObjectId
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/certificate/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        technology,
        issuedDate,
        credentials,
        id,
      }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
