const express = require('express');
const router = express.Router();
const fs = require('fs');
const youtubeTitle = require('get-youtube-title')
const cmd = require('node-cmd');
const { exec } = require('child_process');

let youtubeLibPathWin = __dirname + "/../lib/youtube-dl/windows/youtube-dl.exe"; // youtube-dl executable for servers hosted in windows
let tempFolder = __dirname + "/../public/temp"; // conversion destination


const getYoutubeTitle = (videoID) => {
  return new Promise((resolve, reject) => {
    youtubeTitle(videoID, (err, title) => {
      if (err || !title) {
        reject("not_found");
      }
      else {
        resolve({ title: title.trim().toString() });
      }
    });
  });
}




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/convert", (req, res, next) => {
  if (req.body.link) {

    let link = req.body.link; // URL submitted by the user
    let youtubeVideoCode = link.replace("https://www.youtube.com/watch?v=", ""); // get youtube video ID from URL

    // Define command by Operating System
    if (process.platform === "linux") {
      var convertCommand = "youtube-dl -x --audio-format mp3 --audio-quality 0 -o '" + tempFolder + "/%(title)s.%(ext)s' " + link;
    }
    else {
      var convertCommand = youtubeLibPathWin + " -x --audio-format mp3 --audio-quality 0 -o " + tempFolder + "/%(title)s.%(ext)s " + link;
    }


    // get video title
    getYoutubeTitle(youtubeVideoCode)
      .then((response) => {

        if (response.title) { // if video exists run conversion

          exec(convertCommand, (err, stdout, stderr) => {

            if (err) throw err;

            res.send({
              downloadURL: "/music/" + response.title + ".mp3"
            })

          });

        }
        else {
          res.send("video_not_found");
        }

      }).catch((response) => {
        res.send("video_not_found");
      })
  }
  else {
    res.sendStatus(403);
  }

})


module.exports = router;
