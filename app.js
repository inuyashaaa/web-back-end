console.log("Hello World!");
const fs = require('fs');

fs.writeFileSync('firstapp.txt', 'Hello world, file system'); //Đồng bộ, chạy theo thứ tự

var content = fs.readFileSync('firstapp.txt', 'utf8');
console.log(content);


//Cai thu vien express
const express = require('express');

var app = express();

//Set public folder public
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('./public/index.html');
});

app.get('/image/add', (req, res) => {
    var imageInfo = {
        name: req.query.name,
        imageLink: req.query.imageLink,
        description: req.query.description
    };
    //Lấy dữ liệu cũ trong file JSON
    var oldData = JSON.parse(fs.readFileSync('imageData.json', 'utf-8'));

    //Thêm dữ liệu vừa lấy từ form
    oldData.push(imageInfo);
    fs.writeFileSync('imageData.json', JSON.stringify(oldData));
    res.send("Xong rồi em >.<");
    // backURL = req.header('Referer') || '/';
    // res.redirect(backURL);
});

app.get('/image/show', (req, res) => {
    //Lấy dữ liệu ra tù file
    var data = JSON.parse(fs.readFileSync('imageData.json', 'utf-8'));
    var dataShow = '';
    Array.from(data).forEach(data => {
        dataShow += "<!DOCTYPE html><html><head><meta charset='utf-8'><title>ImageData</title></head><body>" +
            "Tên ảnh: " + data.name + "</br>" + "<img src='" + data.imageLink + "'/></br>" + "Mô tả: " + data.description + "</br>"
            + "</body></html>";
    });
    res.send(dataShow);
});

//Mo 1 cai port de chay local
app.listen(6969, (req, res) => {
    console.log('App listen on 6969');
});
