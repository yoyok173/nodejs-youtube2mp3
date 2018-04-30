const express = require('express');
const http = require('http');

const cmd = require('node-cmd');
let youtubeDLPath = __dirname + "/lib/youtube-dl/youtube-dl.exe";

let app = express();
app.set('port', 8080);




app.post("/convert", (req, res, next) => {
    // https://www.youtube.com/watch?v=1GX_4PgUhYo
    let link = req.body.link;

    // -o C:/Users/John/Desktop/%(title)s.%(ext)s
    let convertCommand = youtubeDLPath + " -x --audio-format mp3 --audio-quality 0 " + link;

    cmd.get(convertCommand, (err, data, stderr) => {
        res.send(data);
    });
})


http.createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port') + "\nPress CTRL+C to quit");
});

