import header from "./header";
import footer from "./footer";
import social from "./social";
import hero from "./hero";
import a11y from "./a11y";
import seo from "./seo";
import sections from "./sections";

import type { Dictionary } from "../types";

const es: Dictionary = {
  ...header,
  ...footer,
  ...social,
  ...hero,
  ...a11y,
  ...seo,
  ...sections,
  firstname: "Guilherme",
  lastname: "Santos",
  role: "Ingeniero de Software Accesible",
  rights: "Todos los derechos reservados",
};

export default es;
