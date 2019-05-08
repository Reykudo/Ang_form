var path = require("path");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin"); // плагин минимизации
//var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        "polyfills": "./ClientApp/polyfills.ts",
        "app": "./ClientApp/main.ts"
    },
    output: {
        path: path.resolve(__dirname, "wwwroot/dist"), // путь к каталогу выходных файлов - папка public
        publicPath: "/dist",
        filename: "[name].js" // название создаваемого файла
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [ //загрузчик для ts
            {
                test: /\.ts$/, // определяем тип файлов
                use: [{
                        loader: "awesome-typescript-loader",
                        options: {
                            configFileName: path.resolve(__dirname, "tsconfig.json")
                        }
                    },
                    "angular2-template-loader"
                ]
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }, {
                test: /\.less$/,
                loaders: ["to-string-loader", "css-loader", "less-loader"]
            }, {
                test: /\.css$/,
                loader: "css-loader"
            }, {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, "ClientApp"), // каталог с исходными файлами
            {} // карта маршрутов
        ),

        new UglifyJSPlugin()

    ]
}