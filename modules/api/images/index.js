const express = require('express');

const Router = express.Router();

const imagesController = require('./imagesController');

Router.post('/', (req, res) => {
    //khai bao object
    var imageInfo = {
        name: req.body.name,
        imageLink: req.body.imageLink,
        description: req.body.description
    }

    console.log('post data ', req.body);

    //luu lai vao database
    imagesController.addImage(imageInfo, (err,doc) =>{
      if (err) {
          console.log(err);
          res.send("Co loi xay ra!");
      }else {
        res.send("Success!");
      }
    });
    //bao thanh cong
    res.send('Success');
});

Router.get('/', (req, res) => {
    try {
        imagesController.getAllImages((err, doc) => {
            if (err) {
                console.log(err);
                res.send("Cos loi roi em :v :v :v");
            } else {
                res.send(doc);
            }
        });
    } catch (e) {
        console.log(e);
        res.send("Co loi xay ra");
    }
})

Router.put('/', (req, res) => {
    if (req.body.id) {
        var newData = {
            name: req.body.name,
            imageLink: req.body.imageLink,
            description: req.body.description
        }

        var result = imagesController.updateImageCollectionById(req.body.id, newData);

        res.send(result);
        return;
    }
    res.send(`Don't have id`);
})

Router.delete('/', (req, res) => {
    imagesController.getNewest();
})

module.exports = Router;
