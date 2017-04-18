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

module.exports = {
    fetImageCollection: fetImageCollection,
    saveImageCollection: saveImageCollection
}
