const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    devServer: {
        static: './dist',
        hot: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        clean: true
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',
                    target: 'es2015'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015'
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]
};
