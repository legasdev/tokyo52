const
    path = require("path"),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    TerserWebpackPlugin = require('terser-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

// style files regexes
const
    cssRegex = /\.css$/,
    lessRegex = /\.less$/;

const
    isDevelopment = process.env.NODE_ENV === 'development',
    isProduction = !isDevelopment;

const
    mode = isDevelopment ? 'development' : 'production';

const
    nameFiles = (firstName, typeFile) =>
        isDevelopment
            ? `[${firstName}].${typeFile}`
            : `[${firstName}]-[contenthash].${typeFile}`;



const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                sourceMap: isDevelopment
            }
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: isDevelopment
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: ['> 0.0001%', 'not dead']
                    }),
                    require('cssnano')({ preset: 'default' }),
                    require('postcss-flexbugs-fixes')
                ],
                sourceMap: isDevelopment
            }
        }
    ];

    if (extra) loaders.push(extra);

    return loaders;
};

module.exports = {
    context: __dirname,
    mode,
    devtool: isDevelopment ? 'source-map' : '',
    entry: {
        common: './src/js/common.js',
        main: [
            './src/less/home/index.less',
            './src/js/home/index.js'
        ],
        about: [
            './src/less/about/index.less',
            './src/js/about/index.js'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'build/'),
        publicPath: '/',
        filename: nameFiles('name', 'js'),
        chunkFilename: nameFiles('name', 'js')
    },
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, './src/js/'),
            '@less': path.resolve(__dirname, './src/less/'),
            '@img': path.resolve(__dirname, `./src/img/`),
        }
    },
    devServer: {
        port: 8000
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendors'
        },
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                cache: false,
                parallel: true,
                sourceMap: isDevelopment,
                extractComments: true,
            }),
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['common', 'main'],
            minify: {
                collapseWhitespace: isProduction
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/about.html',
            chunks: ['common', 'about'],
            minify: {
                collapseWhitespace: isProduction
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, 'build/img')
            }
        ]),
        // new BundleAnalyzerPlugin([]), // Показывать ли статистику по пакетам
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!*.woff', '!*.woff2', '!*.ttf', '!*.eot', '!*.otf', '!*.svg', '!*.png']
        }),
        new MiniCssExtractPlugin({
            filename: nameFiles('name', 'css'),
            chunkFilename: nameFiles('id', 'css'),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        sourceMap: isDevelopment
                    }
                }
            },
            {
                test: cssRegex,
                use: cssLoaders(),
            },
            {
                test: lessRegex,
                use: cssLoaders({
                    loader: 'less-loader',
                    options: {
                        sourceMap: isDevelopment
                    }
                }),

            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                },
            },
        ],
    },
};