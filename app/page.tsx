import Image from "next/image";

import Projects from "@/components/Projects";
import Playground from "@/components/Playground";
import { getProfileData } from "@/lib/actions/profile.actions";
import Stats from "@/components/Stats";
import UserProfileSection from "@/components/UserProfileSection";
import ProjectCard from "@/components/cards/ProjectCard";
import Navbar from "@/components/shared/Navbar";
import Tab from "@/components/Tab";
import { IPlayground, IProject, ProfileProps } from "@/types";
import PlaygroundCard from "@/components/cards/PlaygroundCard";

const Home = async ({ searchParams }: ProfileProps) => {
  const query = searchParams.query;
  const result = await getProfileData();
  const profileData = result[0];

  return (
    <>
      <Navbar profileData={profileData} />

      <main className="py-11 max-w-[738px] mx-auto flex flex-col">
        <UserProfileSection profileData={profileData} />

        <Tab query={query} />

        {(query === "portfolio" || query === undefined) && (
          <div className="max-md:mx-5 flex flex-col gap-10 mt-10">
            <Stats />

            <Projects />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profileData.projects.map((project: IProject) => (
                <ProjectCard key={project?.title} project={project} />
              ))}
            </div>

            <Playground />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profileData.playgrounds.map((playground: IPlayground) => (
                <PlaygroundCard
                  key={playground?.title}
                  playground={playground}
                />
              ))}
            </div>
          </div>
        )}

        {query === "resume" && (
          <div className="max-md:mx-5 flex flex-col gap-10 mt-10">
            <section className="flex flex-col gap-6">
              <h3 className="text-center text-2xl text-zinc-900 font-bold">
                About me
              </h3>

              <p className="text-base font-medium text-zinc-900">
                I&apos;m a passionate software engineer with a knack for
                building robust applications and finding innovative solutions to
                complex challenges. Proficient in multiple programming languages
                and frameworks, I&apos;m driven by a continuous learning mindset
                and a dedication to creating efficient and elegant code. With a
                strong foundation in computer science and a track record of
                successful projects, I thrive in collaborative environments
                where I can contribute my technical expertise and
                problem-solving skills to deliver impactful software solutions.
              </p>
            </section>

            <section>
              <div className="flex gap-4 flex-wrap p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <Image
                  src="/assets/icons/test.svg"
                  alt="tets"
                  width={40}
                  height={40}
                />

                <div className="flex-1">
                  <h3 className="text-zinc-900 text-xl font-semibold">
                    Front-end developer at Google
                  </h3>

                  <div className="flex justify-between">
                    <div className="text-zinc-900 text-base flex items-center gap-2">
                      <p>London</p>

                      <span className="bg-zinc-600 h-1 w-1 rounded-full"></span>

                      <p>Google Inc</p>
                    </div>

                    <p className="text-zinc-900 text-base font-semibold">
                      May 2021 - Present
                    </p>
                  </div>

                  <p className="text-zinc-500 text-base">
                    This role would be great for a web developer with 3+
                    years&apos; experience in designing and developing
                    responsive websites. This position requires a profound
                    understanding of the development process, using front-end
                    technologies including HTML5, CSS3, JavaScript, jQuery,
                    PHP/WordPress.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
