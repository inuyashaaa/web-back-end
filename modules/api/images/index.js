const express = require('express');

const imagesController = require('./imagesController');

const Router = express.Router();

Router.post('/', (req, res) => {
    try {
        var imageInfo = {
            name: req.body.name,
            imageLink: req.body.imageLink,
            description: req.body.description
        }
        imagesController.addImage(imageInfo);
        res.send('Success');
    } catch (e) {
        console.log(e);
    }
});

Router.get('/', (req, res) => {
    try {
        if (req.query.id) {
            imagesController.getImagesById(req.query.id).then((result) => {
                res.send(result)
            });
        } else if (req.query.name) {
            imagesController.getImagesByName(req.query.name).then((result) => {
                res.send(result);
            });
        } else {
            imagesController.getAllImages().then((result) => {
                res.send(result)
            });
        }
    } catch (e) {
        console.log(e);
    }
});

Router.put('/', (req, res) => {
    try {
        if (req.body.id) {
            var newData = {
                name: req.body.name,
                imageLink: req.body.imageLink,
                description: req.body.description
            }
            imagesController.updateImageCollectionById(req.body.id, newData).then((result) => {
                res.send(result)
            });
        }
    } catch (e) {
        console.log(e);
    }
});

Router.delete('/', (req, res) => {
    try {
        if (req.body.id) {
            imagesController.deleteImageById(req.body.id).then((result) => {
                res.send(result);
            });
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = Router;
