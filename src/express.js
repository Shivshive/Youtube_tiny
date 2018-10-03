const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 3000;
var url = require('url');

var vid_id;

module.exports = function (win) {
    const app = express()
    app.use(cors())
    app.get('/', (req, res) => {
        console.log(path.join(__dirname, 'index.html'))
        res.sendFile(path.join(__dirname, 'index.html'))
    })

    app.post('/addVideo', (req, res) => {
        var location = req.query.location;
        console.log(location);
        var video_parts = url.parse(location, true);
        console.log(video_parts.query.v);
        vid_id = video_parts.query.v;
        win.webContents.send('targetPriceVal', vid_id)
        res.send('added..');
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}