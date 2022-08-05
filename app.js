const express = require('express')
const jimp = require('jimp');
const uuid = require('uuid');
const path = require('path');
const { exec } = require('child_process')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());

app.get('/text/:text', async (req, res) => {
    const image = await jimp.read('template.jpg');
    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

    const id = uuid.v4();
    image.print(font, 1, 20, req.params.text).write(`./public/${id}.jpg`);
    res.send({
        your_text: req.params.text,
        imageUrl: `http://localhost:3000/public/${id}.jpg`
    })
})

app.post('/national-card/create', async (req, res) => {
    const id = uuid.v4();
    const info = req.body;
    
    exec('python3 image_write.py ' + info.national_code + ' ./public/' + id + '.jpg')
    res.send({ url: `http://localhost:3000/public/${id}.jpg` })
})

app.get('/public/:id', async (req, res) => {
    const imageId = req.params.id;

    res.sendFile(path.resolve('./public/' + imageId));
})

app.listen(3000, (err, res) => console.log('http://localhost:3000/'))