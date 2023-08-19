import Image from "next/image";
import Link from "next/link";

import { IProject } from "@/types";
import EditProject from "../edit-form-modal/EditProject";

interface IProjectProps {
  project: IProject;
}

const ProjectCard = ({ project }: IProjectProps) => {
  const [label, imgSrc] = project.technology.split("|");

  return (
    <div className="flex flex-col p-4 rounded-lg border border-zinc-100 bg-zink-50">
      <Image
        src={project.picture}
        alt={project.title}
        width={327}
        height={200}
        className="md:max-h-[200px] md:h-full object-contain"
      />

      <div className="flex-between gap-5 mt-5">
        <Link href={project.githubLink} className="text-lg font-bold text-zinc-900">
          {project.title}
        </Link>

        <EditProject project={project} />
      </div>

      <div className="mt-2 flex justify-start items-center gap-3">
        <Image src={imgSrc} alt={label} width={20} height={20} />

        <p className="text-zinc-500 text-sm align-middle">{label}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
