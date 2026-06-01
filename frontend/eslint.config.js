import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import jsxA11y from "eslint-plugin-jsx-a11y";
import sonarjs from "eslint-plugin-sonarjs";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "coverage/**",
      "playwright-report/**",
      "src/env.d.ts",
    ],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      "jsx-a11y": jsxA11y,
      sonarjs,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "import/no-duplicates": "error",
      "sonarjs/cognitive-complexity": ["warn", 15],
    },
  },
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
