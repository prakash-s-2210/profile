// Get Profile Information

export const getProfileData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/profile", {
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

export async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/projects", {
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
