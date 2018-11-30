const path = require('path');

module.exports = {
	mode: 'development',

	entry: ['./client/index.js'],
	output: {
		path: path.join(__dirname, '/dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},

	devServer: {
		watchContentBase: true,
		compress: true,
		port: 3000
	}, 

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(disposables)/,
				use: {
					loader: "babel-loader",
					options: { presets: ["@babel/preset-env"]}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "css-loader"
					}
				]
			}
		]
	}, 
	resolve: {
		// allows users to leave off .js or .jsx when they import files
		extensions: ['.js', '.jsx']
	}
}