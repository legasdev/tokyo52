const
    path = require("path"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    TerserWebpackPlugin = require('terser-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

// style files regexes
const
    cssRegex = /\.css$/,
    lessRegex = /\.less$/;

const
    isDevelopment = process.env.NODE_ENV === 'development',
    isProduction = !isDevelopment;

const
    mode = isDevelopment ? 'development' : 'production'; // production or development
    // isDevelopment = mode !== 'production';

const
    nameFiles = (firstName, typeFile) =>
        isDevelopment
            ? `[${firstName}].${typeFile}`
            : `[${firstName}].[contenthash].${typeFile}`;

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
    context: path.resolve(__dirname),
    mode,
    devtool: isDevelopment ? 'source-map' : '',
    entry: {
        main: ['./src/less/home/index.less', './src/js/home/index.js'],
        about: ['./src/less/about/index.less', './src/js/about/index.js']
    },
    output: {
        path: path.resolve('./build/'),
        publicPath: '/',
        filename: nameFiles('name', 'js'),
        chunkFilename: nameFiles('name', 'js')
    },
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, './src/js/'),
            '@less': path.resolve(__dirname, `./src/less/`),
            // '@img': path.resolve(__dirname, `./src/img/`),
            // '@font': path.resolve(__dirname, `./src/font/`),
        }
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
                sourceMap: isDevelopment, // Must be set to true if using source-maps in production
                extractComments: true,
            }),
        ],
    },
    devServer: {
        port: 8000
    },

    plugins: [
        // new BundleAnalyzerPlugin([]), // Показывать ли статистику по пакетам
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['main'],
            minify: {
                collapseWhitespace: isProduction
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/about.html',
            chunks: ['about'],
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
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!*.woff', '!*.woff2', '!*.ttf', '!*.eot', '!*.svg', '!*.png']
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
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                },
            },
        ],
    },
};