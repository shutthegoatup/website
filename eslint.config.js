import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist/", ".astro/", "node_modules/", "public/"] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    // astro-eslint-parser cannot type template expressions, so type-aware rules
    // only produce false positives here. `astro check` type-checks these files.
    files: ["**/*.astro"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ["*.config.{js,mjs}", "scripts/**"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  prettier,
);
