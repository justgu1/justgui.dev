import header from "./header";
import footer from "./footer";
import social from "./social";
import hero from "./hero";

import type { Dictionary } from "../types";

const en: Dictionary = {
  ...header,
  ...footer,
  ...social,
  ...hero,
  "firstname": "Guilherme",
  "lastname": "Santos",
  "role": "Accessible Software Engineer",
  "rights": "All rights reserved",
};

export default en;