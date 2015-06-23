var tcp = require('net')
var transport = require('spdy-transport')

tcp.createServer(function (socket) {
  var server = transport.connection.create(socket, {
    protocol: 'spdy',
    isServer: true
  })

  server.on('stream', function (stream) {
    console.log(stream.method, stream.path, stream.headers)
    stream.respond(200, {
      header: 'value'
    })

    stream.on('readable', function () {
      var chunk = stream.read()
      if (!chunk) {
        return
      }
      console.log(chunk)
    })

    stream.on('end', function () {
      console.log('end')
    })

    // And other node.js Stream APIs
    // ...
  })

}).listen(9988)

