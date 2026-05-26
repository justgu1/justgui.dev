import header from "./header";
import footer from "./footer";
import social from "./social";

import type { Dictionary } from "../types";

const en: Dictionary = {
  ...header,
  ...footer,
  ...social,
  "firstname": "Guilherme",
  "lastname": "Santos",
  "role": "Accessible Software Engineer",
  "rights": "All rights reserved",
};

export default en;