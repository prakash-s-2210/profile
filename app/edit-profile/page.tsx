import Profile from "@/components/edit-form/Profile";
import { getProfileData } from "@/lib/actions/profile.actions";
import { IProfile, ProfileProps } from "@/types";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";
import Socials from "@/components/edit-form/Socials";
import Portfolio from "@/components/edit-form/Portfolio";
import Resume from "@/components/edit-form/Resume";

const page = async ({ searchParams }: ProfileProps) => {
  const query = searchParams?.query;

  const result: IProfile[] = await getProfileData();
  const profileData: IProfile = result[0];

  return (
    <>
      <Navbar profilePicture={profileData.profilePicture} query={query} />

      <main className="flex max-w-5xl mx-auto px-5 lg:px-0">
        <LeftSidebar query={query} />

        <div className="w-full md:p-16 sm:px-8 py-8">
          {(query === undefined || query === "profile") && (
            <Profile profileData={profileData} />
          )}

          {query === "socials" && <Socials profileData={profileData} />}

          {query === "portfolio" && <Portfolio profileData={profileData} />}

          {query === "resume" && <Resume profileData={profileData} />}
        </div>
      </main>
    </>
  );
};

export default page;
