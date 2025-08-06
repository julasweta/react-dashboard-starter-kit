export interface Experience {
  position: string;
  company: string;
  cityCountry: string;
  period: string;
  responsibilities: string;
}

export interface Education {
  institution: string;
  specialization: string;
  degree: string;
  graduationYear: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  fullName: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  goal: string;
  skills: string[]; // тільки масив
  education: Education[];
  certificates: (Certificate | string)[];
  qualities: string[]; // тільки масив
  additional: string;
  languages: string[]; // тільки масив
  projects: (Project | string)[];
  summary: string;
  experiences: Experience[];
}


export type GenerationMode = "userOnly" | "merge" | "replace";