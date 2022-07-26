module.exports = {
    IP: '64.227.1.112',
    PUERTO: process.env.NODE_ENV == 'development' ? 5555 : 7171, // se cambia a 3112 cuando ya es desarrollo
    URL: `http://${this.IP}:${this.PUERTO}`
}