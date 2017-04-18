console.log("Hello World!");
const fs = require('fs');
const imagesController = require(__dirname + "/modules/images/imagesController");
fs.writeFileSync('firstapp.txt', 'Hello world, file system'); //Đồng bộ, chạy theo thứ tự

var content = fs.readFileSync('firstapp.txt', 'utf8');
console.log(content);


//Cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/addImage.html');
});

//Set public folder public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extented: true
}));
app.use(bodyParser.json({
    extented: true
}));

// app.post('/image', (req, res) => {
//     var imageInfo = {
//         name: req.body.name,
//         imageLink: req.body.imageLink,
//         description: req.body.description
//     };
//     // console.log(req.body);
//     //Lấy dữ liệu cũ trong file JSON
//     var oldDataFetch = imagesController.fetImageCollection();
//     oldDataFetch.push(imageInfo);
//     imagesController.saveImageCollection(oldDataFetch);
//     res.send("Xong rồi em >.<");
//     // backURL = req.header('Referer') || '/';
//     // console.log(backURL);
//     // res.redirect(backURL);
// });

app.get('/image', (req, res) => {
    //Lấy dữ liệu ra tù file
    var data = imagesController.fetImageCollection();
    var dataShow = '';
    Array.from(data).forEach(data => {
        // dataShow += "<!DOCTYPE html><html><head><meta charset='utf-8'><title>ImageData</title></head><body>" +
        //     "Tên ảnh: " + data.name + "</br>" + "<img src='" + data.imageLink + "'/></br>" + "Mô tả: " + data.description + "</br>" +
        //     "</body></html>";
        dataShow += `<div>Ten nha: ${data.name}</div><img src="${data.imageLink}"><div>Mo ta: ${data.description}</div>`;
    });
    res.send(dataShow);
});

// Đây là method PUT nhưng để test dễ thì em chuyển thành POST để có thể dùng form bên HTML test kết quả luôn :))
// app.post("/image", (req, res) => {
//     var imageInfo = {
//         name: req.body.name,
//         imageLink: req.body.imageLink,
//         description: req.body.description
//     };
//     var oldDataFetch = [];
//     oldDataFetch = imagesController.fetImageCollection();
//     console.log(oldDataFetch);
//     oldDataFetch.forEach(data => {
//         if (imageInfo.name == data.name) {
//             data.imageLink = imageInfo.imageLink;
//             data.description = imageInfo.description;
//         }
//     });
//     imagesController.saveImageCollection(oldDataFetch);
//     res.send('Cập nhật thành công :))');
// });

app.post("/image", (req, res) => {
    var imageInfo = {
        name: req.body.name
    };
    var oldDataFetch = [];
    oldDataFetch = imagesController.fetImageCollection();
    console.log(oldDataFetch);
    oldDataFetch.forEach(data => {
        if (imageInfo.name == data.name) {
            delete data.name;
            delete data.imageLink;
            delete data.description;
        }
    });
    imagesController.saveImageCollection(oldDataFetch);
    res.send('Cập nhật thành công :))');
});
//Mo 1 cai port de chay local
app.listen(6969, (req, res) => {
    console.log('App listen on 6969');
});
