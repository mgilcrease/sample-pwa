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
        rules: [{
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/i,
                loader: "file-loader?name=[name].[ext]"
            },
            {
                test: /\.(woff|wof2|eot|ttf|otf)$/,
                use: "file-loader"
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Output Management",
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin()
    ],
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./public/dist"
    }
}
