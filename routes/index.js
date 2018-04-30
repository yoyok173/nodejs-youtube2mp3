const express = require('express');
const router = express.Router();
const fs = require('fs');
const youtubeTitle = require('get-youtube-title')
const cmd = require('node-cmd');

let youtubeLibPath = __dirname + "/../lib/youtube-dl/youtube-dl.exe";
let tempFolder = __dirname + "/../temp";

const getYoutubeTitle = (videoTitle) => {
  return new Promise((resolve, reject) => {
    youtubeTitle(videoTitle, (err, title) => {
      if (err || !title) {
        reject("not found")
      }
      else {
        resolve({ title: title.trim().toString() });
      }


    })
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/convert", (req, res, next) => {
  // console.log(req.body);
  if (req.body.link) {
    let link = req.body.link;
    let youtubeVideoCode = link.replace("https://www.youtube.com/watch?v=", "");
    let convertCommand = youtubeLibPath + " -x --audio-format mp3 --audio-quality 0 -o " + tempFolder + "/%(title)s.%(ext)s " + link;

    getYoutubeTitle(youtubeVideoCode)
      .then((response) => {
        cmd.get(convertCommand, (err, data, stderr) => {

          if (err) throw err;

          // res.download(tempFolder + "/" + response.title + ".mp3");
          res.send({
            downloadURL: tempFolder + "/" + response.title + ".mp3"
          })

          // fs.unlink("./public/images/uploads/" + req.file.filename, (err) => {
          //   if (err) {
          //     console.log("failed to delete local image:" + err);
          //   } else {
          //     console.log('successfully deleted local image');
          //   }
          // });

        });
      }).catch((response) => {
        res.send("video_not_found");
      })

    // res.send(youtubeVideoCode)



  }
  else {
    res.sendStatus(403);
  }

})

module.exports = router;
