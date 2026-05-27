/** @type {import('lighthouse').Flags} */
module.exports = {
  ci: {
    collect: {
      outputDir: "/tmp/justgui-lighthouse",
      url: [
        "http://127.0.0.1:4321/en/",
        "http://127.0.0.1:4321/pt/",
        "http://127.0.0.1:4321/es/",
      ],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:performance": ["warn", { minScore: 0.85 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "/tmp/justgui-lighthouse",
    },
  },
};
