const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

const entryPoints = {
  index: path.resolve(__dirname, "src", "index.js"),
  mainpage: path.resolve(__dirname, "src", "mainpage.js"),
  // Добавьте другие страницы здесь
};

const htmlPlugins = Object.keys(entryPoints).map((entryName) => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", `${entryName}.html`),
    filename: `${entryName}.html`, // Имя файла для каждой страницы
    cache: false,
    chunks: "all", // Укажите, какой бандл связать с каждой страницей
  });
});

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    static: path.resolve(__dirname, "src"),
    port: 3000,
    open: true,
    watchFiles: path.join(__dirname, "src"),
    //пересборка проекта при подкачке бибилотек
    // watchOptions: {
    //   ignored: /node_modules/,
    // },
    // watchFiles: ["src/*.html"],
  },
  entry: {
    main: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    //куда выводит билд
    path: path.resolve(__dirname, "dist"),
    //очистка билда перед сборкой нового
    clean: true,
    //название js файла в билде
    // [name] - стандартный по вебпаку (main), [contenthash] - добавляептся хэш к названию
    filename: "[name][contenthash].js",
    assetModuleFilename: "assets/img",
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'assets/img' },
        //{ from: 'src/*.js', to: '[name][ext]' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      "...", // Здесь могут быть другие плагины для минимизации (например, TerserPlugin для минификации JavaScript)
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify, // Выбор реализации минимизации изображений
          options: {
            plugins: ['imagemin-gifsicle', 'imagemin-mozjpeg', 'imagemin-pngquant', 'imagemin-svgo'],
          },
        },
      }),
    ],
    minimize: true, // Отключение минификации
  },
};

