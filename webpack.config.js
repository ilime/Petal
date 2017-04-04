'use strict'

const path = require('path')

const OUTPUT_PATH = path.resolve(__dirname, 'bundle')

const config = {
	entry: {
		app: './src/app'
	},
	output: {
		path: OUTPUT_PATH,
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				exclude: /node_modules|\.git/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}

module.exports = config