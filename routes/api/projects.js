const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const Project = require("../../models/Project");

// Validation
const validateProjectInput = require("../../validation/project");
const validateRadius = require("../../validation/radius");

// @route  POST api/projects
// @desc   Add new project
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let projectFields = { coords: {} };

    //Validation
    const { isValid, errors } = validateProjectInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Create new Location record
    const { longitude, latitude, projectName, address, radius } = req.body;
    projectFields.coords.longitude = longitude;
    projectFields.coords.latitude = latitude;
    projectFields.projectName = projectName;
    projectFields.address = address;
    projectFields.radius = parseInt(radius);

    // Check if project exists
    Project.find()
      .then(matches => {
        // If there is a match, check collision
        if (matches.length > 0) {
          for (let project of matches) {
            const isCollision = validateRadius(projectFields, project);
            // If there is a collision with another project, return an error
            if (isCollision) {
              errors.collision = `Van már projekt ezen a területen belül: ${
                project.projectName
              }`;
              return res.status(400).json(errors);
            }
          }
          new Project(projectFields).save().then(project => res.json(project));
        } else {
          new Project(projectFields).save().then(project => res.json(project));
        }
      })
      .catch(err => res.status(400).json(errors));
  }
);

// @route  GET api/projects/all
// @desc   get all projects
// @access Private // Todo
router.get("/all", (req, res) => {
  const errors = {};

  Project.find()
    .then(match => {
      return res.json(match);
    })
    .catch(err => {
      errors.missing = "Nincs egy projekt sem jelenleg az adatbázisban.";
      return res.status(404).json(errors);
    });
});

// @route  DELETE api/projects/:id
// @desc   delete a single project from db
// @access Private // Todo: complete!
router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(match =>
      match
        ? res.json({ message: "Projekt sikeresen eltávolítva" })
        : res
            .status(404)
            .json({
              missing: "Nincs ilyen azonosítójú projekt az adatbázisban"
            })
    )
    .catch(err => {
      errors.missing = "Nincs ilyen azonosítójú projekt az adatbázisban.";
      return res.status(404).json(errors);
    });
});

module.exports = router;
