const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrmPlugin = require('@atlassian/webresource-webpack-plugin');

// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,          // обрабатывает .js, .jsx, .ts, .tsx
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: { esmodules: true } }],
                            '@babel/preset-typescript',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },


    entry: {
        'my-plugin': './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, '../backend/src/main/resources'),
        filename: 'js/[name].js',
        library: '[name]',
        libraryTarget: 'amd',
        publicPath: '',
        // уникальное имя jsonp-функции, чтобы не конфликтовать с другими плагинами
        chunkLoadingGlobal: 'webpackChunk_com_example_my_jira_plugin_backend',
    },
    /*externals: {
        'jira/api/react-18': 'jira/api/react-18',
        'jira/api/react-dom-18': 'jira/api/react-dom-18',
        'wrm/require': 'wrm/require',
    },*/
    optimization: {
        runtimeChunk: 'single', // обязательно
    },
    plugins: [
        new WrmPlugin({
            pluginKey: 'com.example.my-jira-plugin-backend',
            xmlDescriptors: path.resolve(
                __dirname,
                '../backend/src/main/resources/META-INF/plugin-descriptors/wr-defs.xml'
            ),
            webResourceKey: 'entrypoint-my-plugin',
            externals: {
                react: 'jira/api/react-18',
                'react-dom': 'jira/api/react-dom-18',
            },
            providedDependencies: {
                react: {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-18',
                    import: { amd: 'jira/api/react-18' },
                },
                'react-dom': {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-dom-18',
                    import: { amd: 'jira/api/react-dom-18' },
                },
            },

        }),
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    ],
};

