const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const Location = require("../../models/Location");

// Validation
const validateLocationInput = require("../../validation/location");

// @route  POST api/locations/
// @desc   Add new location and asset scan data to db
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let locFields = { coords: {} };

    //Validation
    const { isValid, errors } = validateLocationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Create new Location record
    const { longitude, latitude, assetId } = req.body;
    locFields.coords.longitude = longitude;
    locFields.coords.latitude = latitude;
    locFields.user = req.user.id;
    locFields.asset = assetId;

    // Save location to db
    new Location(locFields)
      .save()
      .then(location => res.json(location))
      .catch(err => res.status(400).json(err));
  }
);

// @route  GET api/locations/all/:assetId
// @desc   Get all the locations of a simple asset
// @access Private
router.get(
  "/all/:assetId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Location.find({ asset: req.params.assetId })
      .populate("asset", ["manufacturer", "model", "imgUrl"])
      .populate("user", ["name"])
      .then(match => res.json(match));
  }
);

// @route  GET api/locations/last/:assetId
// @desc   Get the last location of a simple asset
// @access Private
router.get(
  "/last/:assetId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Location.findOne({ asset: req.params.assetId })
      .sort({ readAt: -1 })
      .populate("asset", ["manufacturer", "model", "imgUrl"])
      .populate("user", ["name"])
      .limit(1)
      .then(match => res.json(match));
  }
);

module.exports = router;
