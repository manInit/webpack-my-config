const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let target = 'web';
let mode = 'development';
let plugins = [
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin(),
	new HtmlWebpackPlugin({
		template: './src/index.html',
		inject: false
	})
];

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	target = 'browserslist';
} 
console.log('ENV: ' + process.env.SERVE)
if (process.env.SERVE) {
	plugins.push(new ReactRefreshWebpackPlugin());
}

let isDev = mode === 'development';

module.exports = {
	mode: mode,
	target: target,
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'images/[hash][ext][query]'
	},
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: ''
						} 
					}, 
					'css-loader', 
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource'
				// type: 'asset', // little image in base64
				// parser: {
				// 	dataUrlCondition: {
				// 		maxSize: 30 * 1024 //30Kb
				// 	}
				// }
			}
		]
	},
	plugins: plugins,
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		contentBase: './dist',
		open: true,
		hot: true
	}
}