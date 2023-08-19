import { Types } from "mongoose";
export interface ICountry {
  name: {
    common: string;
  };
  languages: Record<string, string>;
  flags: {
    png: string;
  };
}
export interface IProfile {
  _id: Types.ObjectId;
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
  visibility: string[];
  projects: Array<IProject>;
  playgrounds: Array<IPlayground>;
  certificates: Array<ICertificates>;
  techStacks: string[];
  workExperience: Array<IWorkExperience>;
  education: Array<IEducation>;
  interests: string[];
  languages: string[];
}

export interface IPlayground {
  _id: Types.ObjectId;
  title: string;
  technology: string;
  createdAt: Date;
  updatedAt: Date;
  visibility: boolean;
}

export interface IProject {
  _id: Types.ObjectId;
  title: string;
  technology: string;
  githubLink: string;
  createdAt: Date,
  updatedAt: Date,
  picture: string;
  visibility: boolean;
}

export interface ICertificate {
  _id: Types.ObjectId;
  title: string;
  technology: string;
  issuedDate: Date;
  credentials: string;
  visibility: boolean;
}

export interface IWorkExperience {
  _id: Types.ObjectId;
  title: string;
  companyName: string;
  location: string;
  startDate: Date;
  endDate: Date;
  present: Boolean;
  description: string;
  visibility: boolean;
}

export interface IEducation {
  _id: Types.ObjectId;
  name: string;
  location: string;
  qualification: string;
  startDate: Date;
  endDate: Date;
  present: boolean;
  description: string;
  visibility: boolean;
}

export interface IUpdateProfileParams {
  name: string;
  profilePicture: string;
  headline: string;
  location: string;
  about: string;
  profession: string;
  dob: string | Date;
  gender: string;
  visibility: string[];
  id: Types.ObjectId;
}

export interface IUpdateSocialsParams {
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  dribble: string;
  behance: string;
  youtube: string;
  gmail: string;
  id: Types.ObjectId;
}

export interface IUpdatePortfolioParams {
  projects: IProject[],
  playgrounds:IPlayground[],
}

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
    query: string,
  }
}

export interface TabProps {
  query: string;
}
