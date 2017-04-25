const fs = require('fs');
const imagesModel = require('./imagesModel');

var addImage = (data) => {
    imagesModel.fi
    imagesModel.create(data, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    })
}
var getAllImages = () => {
    return imagesModel.find({});
}
var getImagesById = (id) => {
    return imagesModel.findById({
        _id: id
    });
}
var saveImageCollection = (data) => {
    fs.writeFileSync('imageData.json', JSON.stringify(data));
}
var updateImageCollectionById = (id, data) => {
    return imagesModel.update({
        _id: id
    }, data);
}
var deleteImageById = (id) =>{
  return imagesModel.deleteOne({_id:id});
}
module.exports = {
    getAllImages,
    getImagesById,
    saveImageCollection,
    updateImageCollectionById,
    deleteImageById,
    addImage
}
