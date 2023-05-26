// package
const express = require("express");
const { query, param, check } = require("express-validator");
const error = require("../../helpers/network/errors");
const response = require("../../helpers/network/response");
const router = express.Router();

const { fieldValidations } = require("../../middlewares/field-validations");

const {
  createPerson,
  getPerson,
  updatePerson,
  getPersons,
  deletePerson,
} = require("./controller");

const { findPersonByCity } = require("./service");

router.post(
  "/",
  [
    check("firstName").not().isEmpty().isString(),
    check("lastName").not().isEmpty().isString(),
    check("phone").not().isEmpty().isString(),
    check("address.city").optional().isString(),
    check("address.zone").optional().isString(),
    check("address.street").optional().isString(),
    fieldValidations,
  ],
  _createPerson
);

router.get(
  "/:saleid",
  [
    param("saleid", "saleid param is required").not().isEmpty(),
    fieldValidations,
  ],
  _getPerson
);

router.patch(
  "/:saleid",
  [
    param("saleid", "saleid param is required").not().isEmpty(),
    check("firstName").optional().isString(),
    check("lastName").optional().isString(),
    check("phone").optional().isString(),
    check("address.city").optional().isString(),
    check("address.zone").optional().isString(),
    check("address.street").optional().isString(),
    fieldValidations,
  ],
  _updatePerson
);

router.get("/", _getPersons);

router.get(
  "/search/person",
  [query("city").not().isEmpty().isString(), fieldValidations],
  _findPersonByCity
);

// NETWORK
function _createPerson(req, res, next) {
  const { firstName, lastName, phone, address } = req.body;
  createPerson(firstName, lastName, phone, address)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

router.delete(
  "/:saleid",
  [
    param("saleid", "saleid param is required").not().isEmpty(),
    fieldValidations,
  ],
  _deletePerson
);

function _getPerson(req, res, next) {
  const saleid = req.params.saleid;
  getPerson(saleid)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _updatePerson(req, res, next) {
  const saleid = req.params.saleid;
  const { firstName, lastName, phone, address } = req.body;
  updatePerson(saleid, { ...req.body })
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _getPersons(req, res, next) {
  getPersons()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _deletePerson(req, res, next) {
  const saleid = req.params.saleid;
  deletePerson(saleid)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

// Service
function _findPersonByCity(req, res, next) {
  const { city } = req.query;
  findPersonByCity(city)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
