exports.config = {    
    ventas: {
        port: process.env.SVENTAS_PORT || 3000,
        host: process.env.SVENTAS_HOST || '127.0.0.1',
    },
    mongodb: {
        db: process.env.DB_CNN
    }
}
