export interface stats {
  imgUrl: string;
  label: string;
  value: string | number;
}

export interface tech {
  imgUrl: string;
  label: string;
}

export interface ProfileProps{
  searchParams: {
    query: string
  }
}

export interface TabProps {
  query: string;
}

export interface IPlayground {
  title: string;
  technology: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  title: string;
  technology: string;
  githubLink: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICertificates {
  title: string;
  technology: string;
  issuedDate: Date;
  credentials: string;
}

export interface IWorkExperience {
  companyName: string;
  location: string;
  startDate: Date;
  endDate: Date;
  present: Boolean;
  description: string;
}

export interface IEducation {
  name: string;
  location: string;
  qualification: string;
  startDate: Date;
  endDate: Date;
  present: boolean;
  description: string;
}

export interface IProfile {
  name: string;
  profilePicture: string;
  headline: string;
  location: string;
  about: string;
  profession: string;
  dob: Date;
  gender: string;
  followings: number;
  followers: number;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  dribble: string;
  behance: string;
  youtube: string;
  gmail: string;
  projects: IProject[];
  playgrounds: IPlayground[];
  certificates: ICertificates[];
  techStacks: [string];
  workExperience: IWorkExperience[];
  education: IEducation[];
  interests: [string];
  languages: [string];
}
