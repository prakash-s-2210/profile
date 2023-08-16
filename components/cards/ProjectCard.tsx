import { IProject } from "@/types";
import Image from "next/image";

interface IProjectProps{
    project: IProject
}

const ProjectCard = ({ project }: IProjectProps) => {
  const [label, imgSrc] = project.technology.split("|")

  return (
    <div className="flex flex-col max-md:items-center p-4 rounded-lg border border-zinc-100 bg-zink-50">
      <Image
        src={project.picture}
        alt={project.title}
        width={327}
        height={200}
        className="max-w-[327px] max-h-[200px] md:h-full"
      />

      <h3 className="text-lg font-bold text-zinc-900 mt-5">
        {project.title}
      </h3>

      <div className="mt-2 flex justify-start items-center gap-3">
        <Image
          src={imgSrc}
          alt={label}
          width={20}
          height={20}
        />

        <p className="text-zinc-500 text-sm align-middle">{label}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
