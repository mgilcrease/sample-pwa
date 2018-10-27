const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");

module.exports = {
	entry: {
		app: path.resolve(__dirname, "public", "scripts", "index.js")
	},
	output: {
		path: path.resolve(__dirname, "public", "dist"),
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{ test: /\.html$/, use: "html-loader" },
			{ test: /\.txt$/, use: "raw-loader" },
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			{ 
				test: /\.(png|svg|jpg|gif|ico)$/i, 
				loader: "file-loader?name=[name].[ext]"
				//use: "file-loader" 
			},
			{ test: /\.(woff|wof2|eot|ttf|otf)$/, use: "file-loader" }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ title: "Output Management", template: path.resolve(__dirname, "public", "index.html") }),
		new CleanWebpackPlugin(['dist']),
		new ManifestPlugin()
	],
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./public/dist"
	}
}
