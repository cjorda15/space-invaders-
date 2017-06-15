const path = require('path')

module.exports = {
  entry:["./src/lib/index.js"],
  output:{
    path: path.resolve(__dirname,"build"),
    filename:"bundle.js"
  },
  module:{
    loaders:[
      {test:/\.js$/,
       loaders:"babel-loader",
        exclude:/node_modules/},
      {test:/\.css$/,
       loaders:"style-loader!css-loader"},
       {
  test: /\.(jpg|png|svg)$/,
  loader: 'url-loader',
  options: {
    limit: 25000,
  },
},

    ]
  }
}
