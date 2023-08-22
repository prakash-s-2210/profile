import { IProfile, IPlayground, ICertificate } from "@/types";
import Stats from "@/components/sections/portfolio/Stats";
import Projects from "@/components/sections/portfolio/Projects";
import Playgrounds from "@/components/sections/portfolio/Playgrounds";
import ProjectCard from "@/components/cards/ProjectCard";
import PlaygroundCard from "@/components/cards/PlaygroundCard";
import Certificates from "./Certificates";
import CertificateCard from "@/components/cards/CertificateCard";

interface IPortfolioProps {
  profileData: IProfile;
}

const Portfolio = ({ profileData }: IPortfolioProps) => {
  const visibleProjects = profileData.projects.filter((project) => project.visibility === true);
  const visiblePlaygrounds = profileData.playgrounds.filter((playground) => playground.visibility === true);

  return (
    <div className="max-md:mx-5 flex flex-col gap-10 mt-10">
      <Stats profileData = {profileData} />

      <Projects id={profileData._id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-fit">
        {visibleProjects.map((project) => (
          <ProjectCard key={project?.title} project={project} />
        ))}
      </div>

      <Playgrounds id={profileData._id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visiblePlaygrounds.map((playground: IPlayground) => (
          <PlaygroundCard key={playground?.title} playground={playground} />
        ))}
      </div>

      <Certificates id={profileData._id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {profileData.certificates.map((certificate: ICertificate) => (
          <CertificateCard key={certificate?.title} certificate={certificate} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
