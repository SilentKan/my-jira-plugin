const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrmPlugin = require('atlassian-webresource-webpack-plugin');

module.exports = {
    entry: {
        'my-plugin': './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, '../backend/src/main/resources'),
        filename: 'js/[name].js',
        library: {
            name: 'entrypoint-my-plugin',
            type: 'amd'
        },
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: { 
                    presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],
                    plugins: ['@babel/plugin-transform-runtime']
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: { 
        extensions: ['.tsx','.ts','.js','.jsx']
    },
    externals: {
        react: 'jira/api/react-18',
        'react-dom': 'jira/api/react-dom-18'
    },
    optimization: {
        runtimeChunk: false,
        minimize: false
    },
    plugins: [
        new WrmPlugin({
            pluginKey: 'com.example.my-jira-plugin-backend',
            xmlDescriptors: path.resolve(__dirname, '../backend/src/main/resources/META-INF/plugin-descriptors/wr-defs.xml'),
            webResourceKey: 'entrypoint-my-plugin',
            providedDependencies: {
                react: {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-18',
                    import: { amd: 'jira/api/react-18', var: 'React' }
                },
                'react-dom': {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-dom-18',
                    import: {amd: 'jira/api/react-dom-18', var: 'ReactDOM'}
                }
            },
            verbose: true,
            debug: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            runtime: false,
        }),
    ],
    devtool: 'source-map'
};
