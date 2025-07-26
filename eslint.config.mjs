import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'eslint/config';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("next/core-web-vitals"),

    rules: {
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "@next/next/no-img-element": "off",
        "prefer-const": "error",
        "no-var": "error",
        "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    },
}]);