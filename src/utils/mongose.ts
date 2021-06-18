import mongoose = require('mongoose');
import config from '../config/mongose'

const DB_URI = `${config.url}:${config.port}/${config.db}`

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.connection.on('connected', function() {
   console.log('Mongoose connection open to ' + DB_URI)
})


/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error', function(err: mongoose.NativeError) {
  console.log('Mongoose connection error: '+ err.message)
})

/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

export default mongoose