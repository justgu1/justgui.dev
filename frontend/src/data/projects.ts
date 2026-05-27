import { getProjectsMock } from "./projects.mock";
import type { Project } from "../types/project";

export async function getProjects(lang: string): Promise<Project[]> {
  return getProjectsMock(lang);
}

export async function getFeaturedProject(
  lang: string
): Promise<Project | undefined> {
  const projects = await getProjects(lang);
  return projects.find((project) => project.featured);
}

export async function getAccordionProjects(lang: string): Promise<Project[]> {
  const projects = await getProjects(lang);
  return projects.filter((project) => !project.featured);
}
