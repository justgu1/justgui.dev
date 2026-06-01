import header from "./header";
import footer from "./footer";
import social from "./social";
import hero from "./hero";
import heroSkills from "./hero-skills";
import a11y from "./a11y";
import a11yPanel from "./a11y-panel";
import seo from "./seo";
import sections from "./sections";
import expertise from "./expertise";
import projects from "./projects";
import about from "./about";
import contact from "./contact";
import languages from "./languages";
import welcome from "./welcome";

import type { Dictionary } from "../types";

const en: Dictionary = {
  ...header,
  ...footer,
  ...social,
  ...hero,
  ...heroSkills,
  ...a11y,
  ...a11yPanel,
  ...seo,
  ...sections,
  ...expertise,
  ...projects,
  ...about,
  ...contact,
  ...languages,
  ...welcome,
  firstname: "Guilherme",
  lastname: "Santos",
  role: "Accessible Software Engineer",
  rights: "All rights reserved",
};

export default en;
