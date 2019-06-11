import { Config } from 'bili'

const config: Config = {
    input: './src/index.ts',
    banner: true,
    plugins: {
        babel: false,
        vue: {
            css: true
        }
    },
    output: {
        extractCSS: false,
        fileName: '[name].js'
    }

}

export default config