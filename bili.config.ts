import { Config } from 'bili'

const config: Config = {
    input: [
        './src/index.ts'
    ],
    banner: true,
    plugins: {
        babel: false,
        vue: {
            css: true
        },
        commonjs: true
    },
    output: {
        extractCSS: false,
        fileName: '[name].js',
    }

}

export default config