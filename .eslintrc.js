// global eslint config
// @nuxtjs/eslint-config eslint eslint-config-standard eslint-config-problems eslint-plugin-import eslint-plugin-html eslint-plugin-jest eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaFeatures: {
			legacyDecorators: true,
		},
	},
	globals: {
		chrome: true,
	},
	extends: [
		'@nuxtjs',
		'problems',
		'eslint:recommended',
		'plugin:vue/recommended',
	],
	plugins: ['vue', 'eslint-plugin-html', 'eslint-plugin-vue'],
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		indent: ['warn', 'tab'],
		'no-tabs': 0,
		'no-return-assign': 0,
		'no-trailing-spaces': 1,
		semi: [
			'warn',
			'never',
			{
				beforeStatementContinuationChars: 'always',
			},
		],
		'space-before-function-paren': 'warn',
		'comma-spacing': [
			'warn',
			{
				before: false,
				after: true,
			},
		],
		'no-multiple-empty-lines': [
			'warn',
			{
				max: 2,
				maxEOF: 1,
				maxBOF: 0,
			},
		],
		'operator-linebreak': ['warn', 'after'],
		quotes: ['warn', 'single'],
		curly: ['warn', 'multi'],
		'block-spacing': ['warn', 'always'],
		'comma-dangle': ['warn', 'only-multiline'],
		'no-global-assign': 'warn',
		'no-unused-vars': 'warn',
		'callback-return': ['warn', ['callback', 'cb']],
		'prefer-rest-params': 'warn',
		'array-callback-return': 'warn',
		'vue/multiline-html-element-content-newline': [0],
		'vue/singleline-html-element-content-newline': 0,
		'vue/html-indent': ['warn', 'tab'],
		'vue/html-self-closing': ['warn'],
		'vue/attribute-hyphenation': ['warn', 'always'],
		'vue/mustache-interpolation-spacing': ['warn', 'always'],
		'vue/component-name-in-template-casing': ['off'],
		'vue/no-use-v-if-with-v-for': 1,
		'vue/max-attributes-per-line': [
			'warn',
			{
				singleline: 2,
				multiline: {
					max: 1,
					allowFirstLine: false,
				},
			},
		],
	},
}
