const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let target = 'web';
let mode = 'development';

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	target = 'browserslist';
}

let isDev = mode === 'development';

module.exports = {
	mode: mode,
	target: target,
	output: {
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
	plugins: [
		new MiniCssExtractPlugin()
	],
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