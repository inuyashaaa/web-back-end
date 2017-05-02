const fs = require('fs');
const imagesModel = require('./imagesModel');

var addImage = (data, callback) => {
    imagesModel.findOne({}).select('id').sort({
        id: -1
    }).exec((err, doc) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            var id = doc && doc.id ? doc.id += 1 : 1;
            console.log(doc.id);
            data.id = id;
            imagesModel.create(data, (err, doc) => {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log(doc);
                    callback(null, doc);
                }
            });
        }
    })
}
var getNewest = () => {
    imagesModel.findOne({}, {}, {
        sort: {
            'created_at': -1
        }
    }, (err, doc) => {
        console.log(doc);
    });
}

var getAllImages = (callback) => {
    imagesModel.find({}, (err, doc) => {
        if (err) {
            callback(err);
        } else {
            callback(null, doc);
        }
    })
}

var saveImageCollection = (data) => {
    fs.writeFileSync('imageData.json', JSON.stringify(data));
}

var updateImageCollectionById = (id, newData) => {
    var imageInfoCollection = fetchImageCollection();

    if (id < 1 || id > imageInfoCollection.length)
        return 'Id invalid';
    else {
        imageInfoCollection[id - 1] = newData;

        saveImageCollection(imageInfoCollection);
        return 'Success';
    }
}

module.exports = {
    getAllImages,
    saveImageCollection,
    updateImageCollectionById,
    addImage,
    getNewest
}
