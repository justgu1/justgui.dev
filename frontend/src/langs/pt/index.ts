import header from "./header";
import footer from "./footer";
import social from "./social";
import hero from "./hero";
import heroSkills from "./hero-skills";
import a11y from "./a11y";
import seo from "./seo";
import sections from "./sections";
import expertise from "./expertise";
import projects from "./projects";
import about from "./about";
import contact from "./contact";

import type { Dictionary } from "../types";

const pt: Dictionary = {
  ...header,
  ...footer,
  ...social,
  ...hero,
  ...heroSkills,
  ...a11y,
  ...seo,
  ...sections,
  ...expertise,
  ...projects,
  ...about,
  ...contact,
  firstname: "Guilherme",
  lastname: "Santos",
  role: "Engenheiro de Software Acessível",
  rights: "Todos os direitos reservados",
};

export default pt;
