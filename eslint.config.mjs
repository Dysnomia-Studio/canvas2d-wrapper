import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
	'**/build/',
	'**/dist/',
	'**/node_modules/',
	'**/.snapshots/',
	'**/*.min.js',
]), {
	extends: compat.extends('eslint:recommended'),

	languageOptions: {
		globals: {
			...globals.browser,
			...globals.node,
			...globals['shared-node-browser'],
			...globals.serviceworker,
			...globals.worker,
			...globals.mocha,
		},

		parser: babelParser,
		ecmaVersion: 6,
		sourceType: 'module',

		parserOptions: {
			requireConfigFile: false,

			babelOptions: {
				presets: ['@babel/preset-react'],
			},
		},
	},

	rules: {
		indent: ['error', 'tab', {
			SwitchCase: 1,
		}],

		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-undef': 0,
		'no-unused-vars': 0,
		complexity: ['error', 25],
		eqeqeq: ['warn'],
		'no-alert': ['error'],
		'no-else-return': ['warn'],

		'no-magic-numbers': ['warn', {
			ignore: [0, 1, 2, -1],
			ignoreArrayIndexes: true,
			enforceConst: true,
		}],

		'no-self-compare': ['error'],
		'no-undef-init': ['error'],
		'no-multiple-empty-lines': ['warn'],
		'no-trailing-spaces': ['error'],
		'no-const-assign': ['error'],
		'no-var': ['error'],

		'prefer-const': ['error', {
			destructuring: 'all',
		}],

		'no-console': ['error', {
			allow: ['error', 'debug'],
		}],
	},
}]);