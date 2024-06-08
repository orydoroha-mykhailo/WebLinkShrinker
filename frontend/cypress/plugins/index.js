const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
    const options = {
        webpackOptions: {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: [/node_modules/],
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env'],
                                    plugins: ['@babel/plugin-proposal-optional-chaining']
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    on('file:preprocessor', webpack(options));
    return config;
};
