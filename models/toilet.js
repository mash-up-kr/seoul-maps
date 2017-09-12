const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToiletScheme = new Schema({

    locationName: String,
    location: {
        type: [Number],
        index: '2dSphere'
    },
    toiletType: String,
    insertDate: String,
    updateDate: String
});

module.exports = mongoose.model("toiletLocation", ToiletScheme);