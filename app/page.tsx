import { getProfileData } from "@/lib/actions/profile.actions";
import UserProfileSection from "@/components/sections/UserProfileSection";
import Tab from "@/components/sections/Tab";
import { IProfile, ProfileProps } from "@/types";
import Portfolio from "@/components/sections/portfolio/Portfolio";
import Resume from "@/components/sections/resume/Resume";
import { getCountries } from "@/lib/actions/countriesFlag.actions";
import Navbar from "@/components/shared/Navbar";
export const dynamic = 'force-dynamic'
export const revalidate = 0
const Home = async ({ searchParams }: ProfileProps) => {
  const query = searchParams.query;
  const result: IProfile[] = await getProfileData();
  const profileData: IProfile = result[0];
  const countries = await getCountries();

  const filteredLanguagesWithImages = profileData.languages
    .map((language: string) =>
      countries?.find((country) => country.name === language)
    )
    .filter((language) => language !== undefined) // Filter out undefined values
    .map((language) => ({
      name: language?.name,
      image: language?.image,
    }));

  return (
    <>
      <Navbar profilePicture={profileData.profilePicture} query={query} />

      <main className="py-11 max-w-[738px] mx-auto flex flex-col">
        <UserProfileSection profileData={profileData} query={query} />

        <Tab query={query} />

        {(query === "portfolio" || query === undefined) && (
          <Portfolio profileData={profileData} />
        )}

        {query === "resume" && (
          <Resume
            profileData={profileData}
            filteredLanguagesWithImages={filteredLanguagesWithImages}
          />
        )}
      </main>
    </>
  );
};

export default Home;
