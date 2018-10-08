export default {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: "> 0.25%, not dead"
            }
        ]
    ],
    plugins: [
        "@babel/plugin-transform-react-jsx",
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: false
            }
        ]
    ]
}