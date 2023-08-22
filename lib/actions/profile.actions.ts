// Get Profile Information

export const getProfileData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/profile`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("Failed to fetch profile information");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch profile information");
  }
};
