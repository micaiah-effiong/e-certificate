const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const auth = require("../middlewares/authenticate")(db);
const stuDetails = require("../middlewares/user-details")(db);
const { errorResponse, asyncHandler } = require("../handlers/index");

module.exports = function (db) {
  return {
    name: "course",
    getAllCourses: asyncHandler(async (req, res, next) => {
      let courses = await db.course.findAll();
      res.json({
        success: true,
        data: courses,
      });
    }),

    createCourse: asyncHandler(async (req, res, next) => {
      let institution = await req.user.getInstitution();
      let course = await institution.createCourse(req.body);
      res.json({
        success: true,
        data: course.toJSON(),
      });
    }),

    updateCourse: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let course = await db.findByPk(req.params.id);
      let courseUpdate = await course.update(body);

      res.json({
        success: true,
        data: courseUpdate,
      });
    }),

    deleteCourse: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let course = await db.findByPk(req.params.id);
      let courseDelete = await course.delete();
      res.json({
        success: true,
        data: courseDelete,
      });
    }),
  };
};
