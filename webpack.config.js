const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
	entry: path.resolve('src/index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve('build'),
	},
	devServer: {
		contentBase: path.resolve('public'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'env',
							{
								modules: false,
							},
						],
						'stage-2',
						'react',
					],
				},
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								camelCase: true,
								localIdentName:
									'[path][name]__[local]--[hash:base64:5]',
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('postcss-import'),
									require('postcss-cssnext')({
										features: {
											customProperties: {
												variables: require('./brands.json'),
											},
										},
									}),
								],
							},
						},
					],
				}),
			},
		],
	},
	plugins: [new ExtractTextPlugin('styles.css')],
}

module.exports = config
