module.exports = {
    devServer: {
        proxy: {    //proxy代理解决跨域
            '/api': {       
                target: 'http://localhost:3000',   
                changeOrigin: true,
                pathRewrite:{      
                    "^/api":""    
                }
            }
        }
    }
}