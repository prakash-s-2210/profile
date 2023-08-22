"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { startTransition, useEffect, useState } from "react";

import { IProfile, IProject } from "@/types";
import { timeAgo } from "@/lib/utils";
import { Types } from "mongoose";
import { updatePortfolio } from "@/lib/actions/edit-form/editForm.actions";

interface IPortfolioFormProps {
  profileData: IProfile;
}

const Portfolio = ({ profileData }: IPortfolioFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectChanges, setProjectChanges] = useState(false);
  const [playgroundChanges, setPlaygroundChanges] = useState(false);

  const [portfolioInfo, setPortfolioInfo] = useState({
    projects: profileData.projects,
    playgrounds: profileData.playgrounds,
  });

  const [showAllPlaygrounds, setShowAllPlaygrounds] = useState(
    portfolioInfo.playgrounds.length < 4
  );
  const [showAllProjects, setShowAllProjects] = useState(
    portfolioInfo.projects.length < 4
  );

  const visibleProjects = showAllProjects
    ? portfolioInfo.projects
    : portfolioInfo.projects.slice(0, 4);
  const visiblePlaygrounds = showAllPlaygrounds
    ? portfolioInfo.playgrounds
    : portfolioInfo.playgrounds.slice(0, 4);

  useEffect(() => {
    let anyProjectChanged = portfolioInfo.projects.some(
      (project, index) =>
        project.visibility !== profileData.projects[index].visibility
    );

    let anyPlaygroundChanged = portfolioInfo.playgrounds.some(
      (playground, index) =>
        playground.visibility !== profileData.playgrounds[index].visibility
    );

    setProjectChanges(anyProjectChanged);
    setPlaygroundChanges(anyPlaygroundChanged);
  }, [
    portfolioInfo.projects,
    portfolioInfo.playgrounds,
    profileData.projects,
    profileData.playgrounds,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { projects, playgrounds } = portfolioInfo;
    const id = profileData._id;
    await updatePortfolio({
      projects,
      playgrounds,
    });
    setIsSubmitting(false);
    setProjectChanges(false);
    setPlaygroundChanges(false);
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  };

  const handleVisibilityToggle = (type: string, id: Types.ObjectId) => {
    const arrayType = type as keyof typeof portfolioInfo;
    const updatedArray = [...portfolioInfo[arrayType]];

    const elementIndex = updatedArray.findIndex((item) => item._id === id);

    const previousVisibility = updatedArray[elementIndex].visibility;

    updatedArray[elementIndex] = {
      ...updatedArray[elementIndex],
      visibility: !previousVisibility,
    };
    // Check if visibility changed for the current element
    if (
      updatedArray[elementIndex].visibility !==
      profileData[arrayType][elementIndex].visibility
    ) {
      arrayType === "projects"
        ? setProjectChanges(true)
        : setPlaygroundChanges(true);
    }

    setPortfolioInfo((prevState) => ({
      ...prevState,
      [arrayType]: updatedArray,
    }));
  };

  return (
    <section className="max-w-[628px] mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex-between">
            <h2 className="text-zinc-900 text-2xl font-bold">Playgrounds</h2>

            {portfolioInfo.playgrounds.length > 4 && (
              <p
                className="text-zinc-500 text-base cursor-pointer"
                onClick={() => {
                  setShowAllPlaygrounds(!showAllPlaygrounds);
                }}
              >
                {showAllPlaygrounds ? "Hide" : "See all"}
              </p>
            )}
          </div>

          {portfolioInfo.playgrounds.length > 0 && <p className="text-zinc-500 font-semibold">{`Choose playgrounds to showcase on your profile by clicking the playgrounds listed.`}</p>}

          <div className="w-fit grid grid-cols-1 md:grid-cols-2 gap-5">
            {visiblePlaygrounds.map((playground) => {
              const [label, imgSrc] = playground.technology.split("|");

              return (
                <div
                  key={playground.title}
                  className={`p-4 flex gap-3 bg-primary-50 rounded-lg cursor-pointer ${
                    playground.visibility
                      ? "border-2 border-primary-600"
                      : "border border-zinc-100"
                  }`}
                  onClick={() =>
                    handleVisibilityToggle("playgrounds", playground._id)
                  }
                >
                  <Image src={imgSrc} alt={label} width={40} height={40} />

                  <div>
                    <div className="flex justify-between">
                      <h3>{playground.title}</h3>

                      {playground.visibility && (
                        <span className="w-4 h-4 border-4 rounded-full border-primary-600"></span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                      <p>{label}</p>

                      <span className="h-1 w-1 rounded-full bg-zinc-500"></span>

                      <p>{timeAgo(playground.updatedAt)}</p>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <Image
                        src="/assets/images/avatars.png"
                        alt="avatar"
                        width={44}
                        height={24}
                      />

                      <p className="text-xs text-zinc-500">
                        Shared with{" "}
                        <span className="font-bold">Adam, Anna.. </span>+7 more
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-between">
            <h2 className="text-zinc-900 text-2xl font-bold">Projects</h2>

            {portfolioInfo.projects.length > 4 && (
              <p
                className="text-zinc-500 text-base cursor-pointer"
                onClick={() => {
                  setShowAllProjects(!showAllProjects);
                }}
              >
                {showAllProjects ? "Hide" : "See all"}
              </p>
            )}
          </div>

          {portfolioInfo.projects.length > 0 && <p className="text-zinc-500 font-semibold">{`Choose projects to showcase on your profile by clicking the projects listed.`}</p>}
          
          <div className="w-fit grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleProjects.map((project) => {
              const [label, imgSrc] = project.technology.split("|");
              return (
                <div
                  key={project.title}
                  className={`flex flex-col p-4 rounded-lg bg-primary-50 cursor-pointer ${
                    project.visibility
                      ? "border-2 border-primary-600"
                      : "border border-zinc-100"
                  }`}
                  onClick={() =>
                    handleVisibilityToggle("projects", project._id)
                  }
                >
                  <Image
                    src={project.picture}
                    alt={project.title}
                    width={327}
                    height={200}
                    className="max-h-[200px] h-full object-contain"
                  />

                  <div className="flex-between gap-5 mt-5">
                    <h3 className="text-lg font-bold text-zinc-900">
                      {project.title}
                    </h3>

                    <Image
                      src="/assets/icons/menu-circle-vertical.svg"
                      alt="menu circle vertical"
                      width={15}
                      height={3}
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                      <p>{label}</p>

                      <span className="h-1 w-1 rounded-full bg-zinc-500"></span>

                      <p>{timeAgo(project.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex justify-end gap-3 text-sm font-semibold">
          <button
            type="button"
            className="py-2 px-4 bg-zinc-100 rounded-lg  text-zinc-900"
            onClick={() => {
              setPortfolioInfo({
                projects: profileData.projects,
                playgrounds: profileData.playgrounds,
              });
              setProjectChanges(false);
              setPlaygroundChanges(false);
            }}
          >
            cancel
          </button>

          <button
            type="submit"
            className={`${
              playgroundChanges || projectChanges
                ? "opacity-100"
                : "pointer-events-none opacity-50"
            } px-4 py-2 bg-primary-600 rounded-lg text-white`}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Portfolio;
