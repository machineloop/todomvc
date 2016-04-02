module.exports = {
	devtool: 'source-maps',
	debug: true,
	entry: './app/boot.ts',
	resolve: {
		extensions: ['', '.ts', '.js']
	},

	output: {
		path: './build',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'awesome-typescript'}
		]
	},

	devServer: {
		historyApiFallback: true
	}

	// plugins: [

	// ]
}