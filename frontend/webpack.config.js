const path = require('path');
const WrmPlugin = require('atlassian-webresource-webpack-plugin');

module.exports = {
    entry: {
        'my-plugin': './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, '../backend/src/main/resources/js'),
        filename: '[name].js',
        publicPath: '/download/resources/com.example.my-plugin:my-plugin-resources/'
    },
    plugins: [
        new WrmPlugin({
            pluginKey: 'com.example.my-plugin',
            webresourceKey: 'my-plugin-resources',
            xmlDescriptors: path.resolve(__dirname, '../backend/target/classes/META-INF/plugin-descriptors/'),
            //xmlDescriptors: path.resolve(__dirname, '../backend/src/main/resources/atlassian-plugin.xml'),
            verbose: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom/client'  // для React 18
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
}; 