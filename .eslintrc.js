/*
 * @Author: hidari
 * @Date: 2022-06-07 17:03:33
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 10:39:00
 * @FilePath: \el-components\.eslintrc.js
 * @Description: eslint 配置
 *
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved.
 */
module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/standard'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],
}
