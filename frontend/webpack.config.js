const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrmPlugin = require('atlassian-webresource-webpack-plugin');

module.exports = {
    entry: {
        'my-plugin': './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, '../backend/src/main/resources'),
        filename: 'js/[name].js',
        libraryTarget: 'amd',
        publicPath: '',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    externals: {
        react: 'jira/api/react-18',
        'react-dom': 'jira/api/react-dom-18',
    },
    optimization: {
        minimize: false,
        runtimeChunk: 'single'
    },
    plugins: [
        new WrmPlugin({
            pluginKey: 'com.example.my-jira-plugin-backend',
            xmlDescriptors: path.resolve(
                __dirname,
                '../backend/src/main/resources/META-INF/plugin-descriptors/wr-defs.xml'
            ),
            webResourceKey: 'entrypoint-my-plugin',
            providedDependencies: {
                react: {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-18',
                    import: { amd: 'jira/api/react-18', var: 'React' },
                },
                'react-dom': {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-dom-18',
                    import: { amd: 'jira/api/react-dom-18', var: 'ReactDOM' },
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
};
