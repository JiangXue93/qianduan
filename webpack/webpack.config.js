var webpack = require("webpack");
module.exports = {
	entry: ["./entry.js"],
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ 
				test: /\.css$/,
				use:[   
						"style-loader",
				        "css-loader",
					]
			},
			{test: /\.(png|jpg)$/, loader: "url-loader?limit=500"},// 添加到这！并且会按照文件大小, 或者转化为 base64, 或者单独作为文件
			//在大小限制后可以加上&name=./[name].[ext]，会将我们的文件生成在设定的文件夹下。
			{
        		test:/\.vue$/,
       			loader:'vue'
      		}
		],
	},
	plugins: [
    	new webpack.ProvidePlugin({
  			Vue: ['./vue.js', 'default']
		})
	]
}