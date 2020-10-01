const
    path = require("path"),
    paths = require('./paths'),
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
    cssRegexModule = /\.module\.css$/,
    lessRegex = /\.less$/,
    lessRegexModule = /\.module\.less$/;

const
    isDevelopment = process.env.NODE_ENV === 'development',
    isProduction = !isDevelopment;

const
    mode = isDevelopment ? 'development' : 'production';

const
    nameFiles = (firstName, typeFile) =>
        isDevelopment
            ? `[${firstName}].${typeFile}`
            : `[${firstName}].${typeFile}`; // .[contenthash]

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

const babelOptions = presets => {

    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        sourceMap: isDevelopment
    };

    if (presets) {
        opts.presets.push(presets);
    }

    return opts;
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
        menu: [
            './src/less/menu/index.less',
            './src/js/menu/index.js'
        ],
        stocks: [
            './src/less/stocks/index.less',
            './src/js/stocks/index.js'
        ],
        contacts: [
            './src/less/contacts/index.less',
            './src/js/contacts/index.js'
        ],
        basket: [
            './src/less/basket/index.less',
            './src/js/basket/index.js'
        ],
        delivery: [
            './src/less/delivery' +
            '/index.less',
            './src/js/delivery/index.js'
        ],
        app: [
            './src/less/app/index.less',
            '@babel/polyfill',
            './src/js/app/index.jsx'
        ]
    },
    output: isProduction ? {
        path: path.resolve(__dirname, './build/'),
        publicPath: '/build/',
        filename: nameFiles('name', 'js'),
        chunkFilename: nameFiles('name', 'js')
    } : {
        publicPath: '/',
        filename: nameFiles('name', 'js'),
        chunkFilename: nameFiles('name', 'js')
    },
    resolve: {
        extensions: paths.moduleFileExtensions
            .map(ext => `.${ext}`),
        alias: {
            '@js': path.resolve(__dirname, './src/js/'),
            '@less': path.resolve(__dirname, './src/less/'),
            '@img': path.resolve(__dirname, `./src/img/`),
            '@src': path.resolve(__dirname, `./src/`),
        }
    },
    devServer: {
        port: 3000,
        publicPath: '/',
        hot: true,
        historyApiFallback: {
            disableDotRule: true
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
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: isProduction ? 'menu.html' : 'menu',
            template: './src/menu.html',
            chunks: ['common', 'menu'],
            minify: {
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: isProduction ? 'stocks.html' : 'stocks',
            template: './src/stocks.html',
            chunks: ['common', 'stocks'],
            minify: {
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: isProduction ? 'contacts.html' : 'contacts',
            template: './src/contacts.html',
            chunks: ['common', 'contacts'],
            minify: {
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: isProduction ? 'basket.html' : 'basket',
            template: './src/basket.html',
            chunks: ['common', 'basket'],
            minify: {
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: isProduction ? 'delivery.html' : 'delivery',
            template: './src/delivery.html',
            chunks: ['common', 'delivery'],
            minify: {
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: isProduction ? 'admin.html' : 'admin',
            template: './src/admin.html',
            chunks: ['app'],
            minify: {
                collapseWhitespace: false
            }
        }),
        new CopyWebpackPlugin(isProduction ? [
            {
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, '../sushi_backend/src/main/resources/static/img')
            }
        ] : []),
        // new BundleAnalyzerPlugin([]), // Показывать ли статистику по пакетам
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!*.woff', '!*.woff2', '!*.ttf', '!*.eot', '!*.otf', '!*.svg', '!*.png', '!*.jpg']
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
                    options: babelOptions()
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
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
                test: lessRegexModule,
                use: cssLoaders({
                    loader: 'less-loader',
                    options: {
                        sourceMap: isDevelopment,
                        importLoaders: 1,
                        modules: true
                    }
                }),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                    outputPath: 'img',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                    outputPath: 'fonts',
                },
            },
        ],
    },
};
