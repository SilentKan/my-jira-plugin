const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WrmPlugin = require('@atlassian/webresource-webpack-plugin');

module.exports = {
    entry: {
        // точка входа – ключ «my-plugin»
        'my-plugin': './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, '../backend/src/main/resources'),
        filename: 'js/[name].js',
        libraryTarget: 'amd',
        library: '[name]', // модуль получит имя, равное ключу точки входа (my-plugin)
        publicPath: '',
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    externals: {
        react: 'jira/api/react-18',
        'react-dom': 'jira/api/react-dom-18',
        // `wr` будет предоставлен как AMD‑модуль web‑resource‑manager
    },
    optimization: {
        minimize: false,
        runtimeChunk: false,
    },
    plugins: [
        new WrmPlugin({
            pluginKey: 'com.example.my-jira-plugin-backend',
            // генерируем XML‑описание web‑resource
            xmlDescriptors: path.resolve(
                __dirname,
                '../backend/src/main/resources/META-INF/plugin-descriptors/wr-defs.xml',
            ),
            // имя web‑resource, которым будем пользоваться в requireResource
            webResourceKey: 'entrypoint-my-plugin',
            contextMap: {
                // укажите контекст подключения, например, atl.general, если
                // ресурс должен быть доступен на любых страницах
                'my-plugin': ['atl.general'],
            },
            providedDependencies: {
                react: {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-18',
                    import: { amd: 'jira/api/react-18', var: 'React' },
                },
                'react-dom': {
                    dependency: 'com.atlassian.plugins.jira-frontend-api:react-dom-18',
                    import: { amd: 'jira/api/react-dom-18', var: 'ReactDOM' },
                },
                // WRM API предоставляет глобальный объект WRM
                'web-resource-manager': {
                    dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-rest:web-resource-manager',
                    import: { amd: 'wr', var: 'WRM' },
                },
            },
            // указываем, что наш код использует web‑resource‑manager
            usedDependencies: ['web-resource-manager'],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
};
