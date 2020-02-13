const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const fullBuild = {
    entry: {
        PopUp: "./src/index.ts", //When Copying this package change 'PopUp' on this line with project name
    },
    output: {
        path: __dirname + "/dst",
        filename: "[name].min.js",
        libraryTarget: "window"
    },
    resolve: {
        extensions: [".ts", ".less"]
    },

    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
    plugins: [new MiniCssExtract({filename: "[name].min.css"})],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtract.loader,
                    'css-loader',
                    'less-loader'
                ],
            }
        ]
    },
};

module.exports = [fullBuild];
