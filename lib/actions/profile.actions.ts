// Get Profile Information

export const getProfileData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/profile`, {
      cache: "no-store"
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
