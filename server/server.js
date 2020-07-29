const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

var userid = 1;

io.on('connection', client => {
    var user = userid++
    client.on('login', () => {
        io.emit('msg-from-server',user+"号用户上线了")
        io.emit('login',user)
    });
    client.on('msg-from-client', data => { 
        var json = JSON.parse(data)
        var chunk = (json.msg).replace(">","&lt;")
        io.emit('msg-from-server'+json.id,user + " --> " +chunk)
        if(json.id != user && json.id!=""){
            io.emit('msg-from-server'+user,user + " --> " +chunk)
        }
    });
});
server.listen(7777);