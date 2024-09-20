const path = require("node:path");


module.exports = {
  entry: "./server.js",
  target: "node",
  mode: "production",
  module: {
    rules: [
        { test: /\.js$/,use: 'babel-loader'},
    ]
},
  output: {
    path: path.join(process.cwd(),"dist"),
    filename: "server.js",
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
};
