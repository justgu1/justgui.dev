import header from "./header";
import footer from "./footer";
import social from "./social";
import hero from "./hero";
import a11y from "./a11y";
import seo from "./seo";
import sections from "./sections";

import type { Dictionary } from "../types";

const pt: Dictionary = {
  ...header,
  ...footer,
  ...social,
  ...hero,
  ...a11y,
  ...seo,
  ...sections,
  firstname: "Guilherme",
  lastname: "Santos",
  role: "Engenheiro de Software Acessível",
  rights: "Todos os direitos reservados",
};

export default pt;
