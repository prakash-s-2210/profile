"use client";

import { useState } from "react";

import { IProfile } from "@/types";

interface IAboutProps {
  profileData: IProfile;
}

const About = ({ profileData }: IAboutProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-center text-2xl text-zinc-900 font-bold">About me</h3>

      <div className="flex flex-col gap-6 items-start">
        <div
          className={`overflow-hidden ${
            expanded ? "max-h-full" : "max-h-12"
          }`}
        >
          <p className="text-base font-medium text-zinc-900">{profileData.about}</p>
        </div>
        {profileData.about.split("\n").length > 3 && (
          <button onClick={toggleExpanded} className="py-2 px-4 bg-zinc-100 rounded-lg text-sm text-zinc-900 font-semibold">
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </section>
  );
};

export default About;
