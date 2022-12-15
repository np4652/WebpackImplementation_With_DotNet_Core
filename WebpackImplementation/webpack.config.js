const path = require("path")

module.exports = {
    entry: {
        main: "./wwwroot/js/main.js",
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname,"wwwroot", "js"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        ],
    },
    mode:'development'
}