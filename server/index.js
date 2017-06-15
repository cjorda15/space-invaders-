const express = require('express')
const app = express()
const path = require('path')



app.set('port', process.env.PORT || 3000)

app.use('/public', express.static(__dirname+'/public'))

app.use('/build', express.static(__dirname+'/build'))

app.use(express.static(path.resolve(__dirname+"/../")))

if(process.env.NODE_ENV !== 'production'){
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config.js')
  app.use(webpackMiddleware(webpack(webpackConfig)))
}else{
  app.use(express.static('src'))
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'src/index.html'))
  })
}


app.get('/', (req,res) => {
  res.sendFile(path.resolve(__dirname+"/../src/index.html"))
})






app.listen(app.get('port'))


console.log('fire away');
