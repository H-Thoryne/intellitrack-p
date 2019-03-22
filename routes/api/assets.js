const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Model
const Asset = require("../../models/Asset");

// Validation
const validateAssetInput = require("../../validation/asset");

// @route  POST api/assets/
// @desc   Add a new tool to db
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateAssetInput(req.body);

    // Bad request if inputs are not valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Search asset in db to make sure it does not exist
    Asset.findOne({
      serialNumber: req.body.serialNumber,
      companyId: req.body.companyId
    })
      .then(match => {
        // If exists, bad request
        if (match) {
          errors.serialNumber = "Ez a gép szerepel már az adatbázisban!";
          errors.companyId = "Ez a gép szerepel már az adatbázisban!";
          return res.status(400).json(errors);
        }

        const assetFields = {};
        if (req.body.manufacturer)
          assetFields.manufacturer = req.body.manufacturer;
        if (req.body.model) assetFields.model = req.body.model;
        if (req.body.category) assetFields.category = req.body.category;
        if (req.body.imgUrl) assetFields.imgUrl = req.body.imgUrl;
        if (req.body.dateBuy) assetFields.dateBuy = req.body.dateBuy;
        if (req.body.companyId) assetFields.companyId = req.body.companyId;
        if (req.body.serialNumber)
          assetFields.serialNumber = req.body.serialNumber;

        // Add new asset
        new Asset(assetFields).save().then(asset => res.json(asset));
      })
      .catch(err => res.status(400).json(err));
  }
);

router.get("/single/bluetooth/:id", (req, res) => {
  const errors = {};
  Asset.findOne({bluetooth: req.params.id})
    .then(match => {
      if (match) {
        return res.json(match);
      } else {
        errors.message = "Nem található ilyen azonosítójú eszköz!";
        return res.json(errors);
      }
    })
    .catch(err => {
      errors.message = "Nem található ilyen azonosítójú eszköz!";
      return res.status(404).json(errors);
    });
});

// @route  GET api/assets/single/:id
// @desc   Get a single asset from db by ID
// @access Private
router.get(
  "/single/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Asset.findById(req.params.id)
      .then(match => {
        if (match) {
          return res.json(match);
        } else {
          errors.message = "Nem található ilyen azonosítójú eszköz!";
          return res.json(errors);
        }
      })
      .catch(err => {
        errors.message = "Nem található ilyen azonosítójú eszköz!";
        return res.status(404).json(errors);
      });
  }
);

// @route  GET api/assets/multiple/:start/:end
// @desc   Get limited number of assets between range start and end
// @access Private
router.get(
  "/multiple/:page/:limit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    let { page, limit } = req.params;

    // Validating params
    page = parseInt(page);
    limit = parseInt(limit);

    // If page number or the limit is not a number returns error
    if (isNaN(page) || isNaN(limit)) {
      errors.format = "Hibás formátum a lekérésben!";
      return res.status(400).json(errors);
    }

    // For safety reasons limit can not be higher than 50 and lower than 1
    // and page can not be lower than 1
    if (limit > 50 || limit < 1 || page < 1) {
      errors.range =
        "Értelmezési tartományon kívüli lekérés. A limit 1-50 tartományba eső egész szám, az oldalszám pedig nem lehet 1-nél kisebb";
      return res.status(400).json(errors);
    }

    // Find the items in given range
    Asset.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .then(match => {
        // If the query is valid but no results, it returns an empty array
        // which needs to be handled like error
        if (match) {
          return res.json(match);
        }
      })
      .catch(err => {
        errors.id = "Nem található az adott feltételekkel eszköz!";
        return res.status(404).json(errors);
      });
  }
);

// @route  GET api/assets/all
// @desc   Get all assets from db
// @access Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Asset.find()
      .then(matches => res.send(matches))
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);

// @route  PUT api/assets/single/:id
// @desc   Update a single asset from db by ID
// @access Private
router.put(
  "/single/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateAssetInput(req.body);
    // Bad request if inputs are not valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const assetFields = {};
    if (req.body.manufacturer) assetFields.manufacturer = req.body.manufacturer;
    if (req.body.model) assetFields.model = req.body.model;
    if (req.body.category) assetFields.category = req.body.category;
    if (req.body.imgUrl) assetFields.imgUrl = req.body.imgUrl;
    if (req.body.dateBuy) assetFields.dateBuy = req.body.dateBuy;
    if (req.body.companyId) assetFields.companyId = req.body.companyId;
    if (req.body.serialNumber) assetFields.serialNumber = req.body.serialNumber;

    // Find and update asset
    Asset.findByIdAndUpdate(req.params.id, assetFields, { new: true })
      .then(updated => res.json(updated))
      .catch(err => res.status(400).json(err));
  }
);

// @route  DELETE api/assets/single/:id
// @desc   Delete a single asset from db by ID
// @access Private
router.delete(
  "/single/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Asset.findByIdAndDelete(req.params.id)
      .then(match => {
        if (match) {
          return res.json({ message: "Tétel törölve" });
        } else {
          errors.id = "Nem található ilyen azonosítójú eszköz!";
          return res.json(errors);
        }
      })
      .catch(err => {
        errors.id = "Nem található ilyen azonosítójú eszköz!";
        return res.json(errors);
      });
  }
);

module.exports = router;
