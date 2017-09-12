const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToiletScheme = new Schema({

    locationName: String,
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number]
        }
    },
    toiletType: String,
    insertDate: String,
    updateDate: String
});

ToiletScheme.index({ "location": "2dsphere" });

module.exports = mongoose.model("toiletLocation", ToiletScheme);