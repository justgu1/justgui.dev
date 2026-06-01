import { getProjectsMock } from "./projects.mock";
import type { Project } from "../types/project";

export const PROJECTS_INITIAL_COUNT = 3;
export const PROJECTS_LOAD_MORE_COUNT = 5;

export async function getProjects(lang: string): Promise<Project[]> {
  return getProjectsMock(lang);
}

export async function getInitialProjects(lang: string): Promise<Project[]> {
  const projects = await getProjects(lang);
  return projects.slice(0, PROJECTS_INITIAL_COUNT);
}

export function getProjectLoadMoreBatches(projects: Project[]): Project[][] {
  const rest = projects.slice(PROJECTS_INITIAL_COUNT);
  const batches: Project[][] = [];
  for (let i = 0; i < rest.length; i += PROJECTS_LOAD_MORE_COUNT) {
    batches.push(rest.slice(i, i + PROJECTS_LOAD_MORE_COUNT));
  }
  return batches;
}

export async function getFirstProjectPreview(
  lang: string
): Promise<string | undefined> {
  const projects = await getProjects(lang);
  return projects[0]?.previewImageUrl;
}
