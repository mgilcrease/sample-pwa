const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const clientLibs = [
	"jquery/dist/jquery.min.js",
	"lodash/lodash.min.js"
];

module.exports = {
    entry: {
        app: path.resolve(__dirname, "public", "index.js")
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
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Output Management",
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin(),
        new WorkboxPlugin.GenerateSW({
            // Exclude images from the precache
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],

            // Define runtime caching rules.
            runtimeCaching: [{
                // Match any request ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

                // Apply a cache-first strategy.
                handler: 'cacheFirst',

                options: {
                    // Use a custom cache name.
                    cacheName: 'images',

                    // Only cache 10 images.
                    expiration: {
                        maxEntries: 10,
                    },
                },
            }],
        }),
        new CopyWebpackPlugin(
            clientLibs.map(lib => {
                return {
                    from: path.resolve(__dirname, `./node_modules/${lib}`),
                    to: path.resolve(__dirname, './public/assets/lib')
                };
            })
        )
    ],
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./public/dist"
    }
}
