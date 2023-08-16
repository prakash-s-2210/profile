"use client";

import { useState } from "react";
import Image from "next/image";

import Modal from "./shared/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { technologies } from "@/constants";
import { tech } from "@/types";
import { createProject } from "@/lib/actions/profile.actions";

const Project = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [projectData, setprojectData] = useState({
    title: "",
    technology: "",
    githubLink: "",
    picture: "",
  });
  const handleClick = () => {
    setisModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await createProject(
      projectData.title,
      projectData.technology,
      projectData.githubLink,
      projectData.picture
    );
    setLoading(false);
    setprojectData({
      title: "",
      technology: "",
      githubLink: "",
      picture: "",
    });
  };

  const handleInputChange = (name: string, value: string) => {
    console.log(name, value, "name");
    setprojectData({
      ...projectData,
      [name]: value,
    });
  };

  return (
    <>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} handleClick={handleClick}>
          <section>
            <h3 className="text-gray-600 text-xl font-semibold pb-5">
              Create a project
            </h3>

            <form
              onSubmit={handleSubmit}
              className="pt-5 border-t border-t-gray-300"
            >
              <label
                htmlFor="title"
                className="text-gray-700 inline-block pb-3 font-medium text-base"
              >
                Project Title
              </label>

              <input
                type="text"
                required
                placeholder="Enter a title"
                value={projectData.title}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("title", e.target.value)}
              />

              <label
                htmlFor="title"
                className="text-gray-700 font-medium text-base pt-5 pb-3 inline-block"
              >
                Technology
              </label>

              <Select
                onValueChange={(value) =>
                  handleInputChange("technology", value)
                }
                required
              >
                <SelectTrigger className="focus:ring-0 focus:ring-offset-0 focus:ring-transparent h-fit px-4 py-3 border border-border rounded-lg text-gray-500">
                  <SelectValue placeholder="Select Technology" />
                </SelectTrigger>

                <SelectContent className="max-h-52 overflow-y-auto">
                  <SelectGroup>
                    <SelectLabel>Technologies</SelectLabel>
                    {technologies.map((tech: tech) => (
                      <SelectItem
                        key={tech.label}
                        value={`${tech.label}|${tech.imgUrl}`}
                      >
                        <div className="flex gap-5">
                          <Image
                            src={tech.imgUrl}
                            alt={tech.label}
                            width={18}
                            height={18}
                          />
                          <p className="text-gray-500">{tech.label}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <label
                htmlFor="github"
                className="inline-block pt-5 pb-3 text-gray-700 font-medium text-base"
              >
                Github Link
              </label>

              <input
                type="text"
                required
                placeholder="Enter a Github link"
                value={projectData.githubLink}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => {
                  handleInputChange("githubLink", e.target.value);
                }}
              />

              <label
                htmlFor="title"
                className="inline-block pt-5 pb-3 text-gray-700 font-medium text-base"
              >
                Project Preview
              </label>

              <input
                required
                type="file"
                accept="image/*"
                placeholder="Enter a Github link"
                onChange={(e) =>
                  new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                  }).then((base64) =>
                    handleInputChange("picture", base64 as string)
                  )
                }
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
              />
              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 rounded-lg text-sm font-semibold text-white"
                >
                  {`${loading ? 'Creating...' : 'Create'}`}
                </button>
              </div>
            </form>
          </section>
        </Modal>
      )}
      <div className="flex-between flex-wrap gap-5">
        <h3 className="text-zinc-900 text-2xl font-bold">Projects</h3>

        <p
          className="text-base font-semibold text-primary-600 cursor-pointer"
          onClick={() => setisModalOpen(true)}
        >
          Create new project
        </p>
      </div>
    </>
  );
};

export default Project;
