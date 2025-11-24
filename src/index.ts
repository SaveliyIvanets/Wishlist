const config = require('./config.json')
const app = require('./app')
const initDb = require('./database').initDb
async function startServer() {
  try {
    await initDb()
    app.listen(config.port)
    console.log(`Сервер запущен на ${config.port} порту`)
  } catch (err) {
    console.debug(err)
  }
}
startServer()
