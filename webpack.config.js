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
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader, 
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