/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "components-no-pages",
      severity: "error",
      from: { path: "^src/components" },
      to: { path: "^src/pages" },
    },
    {
      name: "langs-isolated",
      severity: "error",
      from: { path: "^src/langs" },
      to: {
        pathNot: "^src/langs",
      },
    },
    {
      name: "config-isolated",
      severity: "error",
      from: { path: "^src/config" },
      to: {
        pathNot: "^src/config",
      },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: {
      path: ["node_modules", "dist", ".astro"],
    },
  },
};
