const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
})

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://m.mi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}