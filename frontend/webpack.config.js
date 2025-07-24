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
        library: {
            type: 'amd',
            name: 'my-plugin'
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
        'react': 'react',
        'react-dom': 'react-dom'
    },
    optimization: {
        runtimeChunk: false,
        minimize: false
    },
    plugins: [
        new WrmPlugin({
            pluginKey: 'com.example.my-jira-plugin-backend',
            xmlDescriptors: path.resolve(__dirname, '../backend/src/main/resources/META-INF/plugin-descriptors/wr-defs.xml'),
            contextMap: { 'my-plugin': ['my-react-page'] },
            providedDependencies: {
                'react': {
                    dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-rest:react',
                    import: { amd: 'react' }
                },
                'react-dom': {
                    dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-rest:react-dom',
                    import: { amd: 'react-dom' }
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
