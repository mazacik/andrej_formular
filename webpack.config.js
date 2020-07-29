module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    syntax: 'postcss-scss',
                    loader: "postcss-loader",
                    plugins: () => [
                        require('postcss-import'),
                        require('tailwindcss'),
                        require('autoprefixer'),
                    ]
                }
            },
          {
            test: /\.scss$/i,
            use: [
              'sass-loader',
            ],
          },
        ]
    }
};
