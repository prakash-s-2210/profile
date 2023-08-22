// Get Profile Information

export const getProfileData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/profile`, {
      cache: "no-cache",
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
