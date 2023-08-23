"use client";

import { Types } from "mongoose";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChangeEvent, useState, useTransition } from "react";

import Modal from "../shared/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { createProject, editProject } from "@/lib/actions/profile/project.actions";
import { technologies } from "@/constants";
import { IProject, tech } from "@/types";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

interface IProjectModalProps {
  openModal: boolean;
  closeModal: () => void;
  id?: Types.ObjectId;
  projectInfo?: IProject;
}
export const revalidate = 0;
const ProjectModal = ({
  openModal,
  closeModal,
  id,
  projectInfo,
}: IProjectModalProps) => {
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [projectData, setProjectData] = useState({
    title: projectInfo?.title ?? "",
    technology: projectInfo?.technology ?? undefined,
    githubLink: projectInfo?.githubLink ?? "",
    picture: projectInfo?.picture ?? "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectData.picture) return;

    setLoading(true);

    const blob = projectData.picture;

    const hasImageChanged = isBase64Image(blob);
    let picture = null;

    if (hasImageChanged) {
      const imageResponse = await startUpload(files);
      if (imageResponse?.[0]?.url) {
        picture = imageResponse[0].url;
      }
    }

    if (projectInfo) {
      await editProject(
        projectData.title,
        projectData.technology,
        projectData.githubLink,
        picture ? picture : projectData.picture,
        projectInfo._id
      );
    } else {
      await createProject(
        projectData.title,
        projectData.technology,
        projectData.githubLink,
        picture ? picture : projectData.picture,
        id!
      );
      setProjectData({
        title: "",
        technology: "",
        githubLink: "",
        picture: "",
      });
    }
    setFiles([]);
    setLoading(false);
    closeModal();
    startTransition(() => {
      router.refresh();
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: string
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";

        handleInputChange(fieldChange, imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      {openModal && (
        <Modal openModal={openModal} closeModal={closeModal}>
          <section>
            <h3 className="text-gray-600 text-xl font-semibold pb-5">
              {projectInfo ? "Update a project" : "Create a project"}
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
                htmlFor="technology"
                className="text-gray-700 font-medium text-base pt-5 pb-3 inline-block"
              >
                Technology
              </label>

              <Select
              defaultValue={projectInfo?.technology}
                value={projectData.technology}
                onValueChange={(value) => {
                  console.log(value);
                  handleInputChange("technology", value);
                }}
                required
              >
                <SelectTrigger className="focus:ring-0 focus:ring-offset-0 focus:ring-transparent h-fit px-4 py-3 border border-border rounded-lg text-gray-500">
                  <SelectValue placeholder="Select Technology" ></SelectValue>
                </SelectTrigger>

                <SelectContent className="max-h-52 overflow-y-auto">
                  <SelectGroup>
                    <SelectLabel>Technologies</SelectLabel>
                    {technologies.map((tech: tech, index) => (
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
                            className="w-[18px] h-[18px]"
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
                htmlFor="project-preview"
                className="inline-block pt-5 pb-3 text-gray-700 font-medium text-base"
              >
                Project Preview
              </label>
              <div className="flex flex-col gap-5 pt-3 px-4 py-2 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e, "picture")}
                  className="w-full outline-none placeholder:text-gray-400 text-gray-500 "
                />
                <Image
                  src={
                    projectData?.picture
                      ? projectData.picture
                      : "/assets/images/upload.png"
                  }
                  alt={projectData.title}
                  width={80}
                  height={80}
                  className="object-contain max-w-[80px] max-h-[80px]"
                />
              </div>

              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 rounded-lg text-sm font-semibold text-white"
                >
                  {`${
                    loading
                      ? projectInfo
                        ? "Updating..."
                        : "Creating..."
                      : projectInfo
                      ? "Update"
                      : "Create"
                  }`}
                </button>
              </div>
            </form>
          </section>
        </Modal>
      )}
    </>
  );
};

export default ProjectModal;
