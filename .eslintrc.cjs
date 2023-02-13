/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["*.d.ts"],
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "no-undef": "off",
        "vue/no-v-html": "off",
      },
    },
    {
      files: ["src/pages/**/*"],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ],
}
