module.exports = {
    IP: '172.16.10.205',
    PUERTO: process.env.NODE_ENV == 'development' ? 5555 : 5555, // se cambia a 3112 cuando ya es desarrollo
    URL: `http://${this.IP}:${this.PUERTO}`
}