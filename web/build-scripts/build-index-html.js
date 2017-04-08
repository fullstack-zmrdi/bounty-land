require('babel-register')
require('dotenv').config()

const renderIndex = require('../render-index').default
const fs = require('mz/fs')
const React = require('react')
var writableStream = fs.createWriteStream('static/index.html')
const stream = renderIndex(React.createElement('div', {className: 'wrapper'}, null), true)
stream.pipe(writableStream)
