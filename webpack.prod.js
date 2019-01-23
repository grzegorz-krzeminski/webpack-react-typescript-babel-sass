const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const miniCss = new MiniCssExtractPlugin({
	filename: '[name].[hash].css',
	chunkFilename: '[id].[hash].css',
});
const cleanWebpack = new CleanWebpackPlugin(['dist']);

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: false
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							importer: globImporter(),
							sourceMap: false
						}
					}
				]
			}
		]
	},
	plugins: [
		miniCss,
		cleanWebpack
	]
});