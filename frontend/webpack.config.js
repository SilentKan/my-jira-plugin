const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrmPlugin = require('atlassian-webresource-webpack-plugin');

module.exports = {
    entry: {
        'my-plugin': './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, '../backend/target/classes'), // генерация в META-INF
        filename: 'js/[name].js',
        library: '[name]',
        libraryTarget: 'amd', // обязательно для WRM :contentReference[oaicite:1]{index=1}
        publicPath: '', // без префикса
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: { presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'] },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: { extensions: ['.tsx','.ts','.js','.jsx'] },
    optimization: {
        runtimeChunk: false,
    },
    plugins: [
        new WrmPlugin({
            pluginKey: 'com.example.my-jira-plugin-backend',
            xmlDescriptors: path.resolve(__dirname, '../backend/target/classes/META-INF/plugin-descriptors/wr-defs.xml'),
            contextMap: { 'my-plugin': ['my-react-page'] },
            providedDependencies: {
                react: {
                    dependency: 'com.atlassian.auiplugin:ajs-react',
                    import: { amd: 'react', var: 'React' }
                },
                'react-dom': {
                    dependency: 'com.atlassian.auiplugin:ajs-react-dom',
                    import: { amd: 'react-dom', var: 'ReactDOM' }
                }
            },
            verbose: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            runtime: false,
        }),


    ],
};
