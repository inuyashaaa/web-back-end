const fs = require('fs');

var fetImageCollection = () => {
    var oldData;
    try {
        oldData = JSON.parse(fs.readFileSync('imageData.json', 'utf-8'));
        //Thêm dữ liệu vừa lấy từ form
    } catch (e) {
        console.log(e);
    }
    return oldData;
}

var saveImageCollection = (data) => {
    fs.writeFileSync('imageData.json', JSON.stringify(data));
}

var updateImageCollection = (dataRequest) => {
    let oldDataFetch = fetImageCollection();
    oldDataFetch.forEach(data => {
        if (dataRequest.name == data.name) {
            data.imageLink = dataRequest.imageLink;
            data.description = dataRequest.description;
        }
    });
    saveImageCollection(oldDataFetch);
}

var deleteImageCollection = (dataRequest) => {
    let oldDataFetch = fetImageCollection();
    oldDataFetch.forEach(data => {
        if (dataRequest.name == data.name) {
            delete data.name;
            delete data.imageLink;
            delete data.description;
        }
    });
    saveImageCollection(oldDataFetch);
}

module.exports = {
    fetImageCollection: fetImageCollection,
    saveImageCollection: saveImageCollection,
    updateImage: updateImageCollection,
    deleteImage: deleteImageCollection
}
