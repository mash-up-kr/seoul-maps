const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const ToiletLocation = require('../models/toilet');
const toiletData = require('../data/toiletLocation');


router.post('/insert/toilet', (req, res, next) => {

    toiletData.forEach((index) => {
        let toiletLocation = new ToiletLocation();

        toiletLocation.locationName = index.FNAME;
        toiletLocation.location = [index.X_WGS84, index.Y_WGS84];
        toiletLocation.toiletType = index.ANAME;
        toiletLocation.insertDate = index.INSERTDATE;
        toiletLocation.updateDate = index.UPDATEDATE;
        //TODO 고칠것.
        toiletLocation.save((err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "foreach error"
                });
            }
        })
    });
});


router.get('/get/toilet', (req, res, next) => {

    console.log(req.query);

    let distance = 1/111.12;

    let query = ToiletLocation.find({
        'location': {
            $near: [
                req.query.lng,
                req.query.lat
            ],
            $maxDistance: distance
        }
    });

    query.exec((err, result) => {
        if (err) {
            console.log(err);
            // throw err;
            return res.status(500).json({
                message: "Server Error",
                code: 0
            })
        }

        console.log(city.length);
        if (!city) {
            return res.status(200).json({
                message: "Not Exist Toilet Location",
                code: 2
            });
            // res.json({});
        } else {
            // console.log(result);
            return res.status(200).json({
                message: "Success",
                code: 1,
                results: result
            });
        }

    });
});

module.exports = router;