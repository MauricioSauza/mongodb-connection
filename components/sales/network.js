// package
const express = require("express");
const { query, param, check } = require("express-validator");
const error = require("../../helpers/network/errors");
const response = require("../../helpers/network/response");
const router = express.Router();

const { fieldValidations } = require("../../middlewares/field-validations");

const {
  createSale,
  getSale,
  updateSale,
  getSales,
  deleteSale,
} = require("./controller");

router.post(
  "/",
  [
    check("customerName").not().isEmpty().isString(),
    check("item").not().isEmpty().isString(),
    check("amount").not().isEmpty().isNumeric(),
    fieldValidations,
  ],
  _createSale
);

router.get(
  "/:saleid",
  [
    param("saleid", "saleid param is required").not().isEmpty(),
    fieldValidations,
  ],
  _getSale
);

router.patch(
  "/:saleid",
  [
    param("saleid", "saleid param is required").not().isEmpty(),
    check("customerName").optional().isString(),
    check("item").optional().isString(),
    check("amount").optional().isNumeric(),
    fieldValidations,
  ],
  _updateSale
);

router.get("/", _getSales);

// NETWORK
function _createSale(req, res, next) {
  const { customerName, item, amount } = req.body;
  createSale(customerName, item, amount)
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
  _deleteSale
);

function _getSale(req, res, next) {
  const saleid = req.params.saleid;
  getSale(saleid)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _updateSale(req, res, next) {
  const saleid = req.params.saleid;
  const { customerName, item, amount } = req.body;
  updateSale(saleid, { customerName, item, amount })
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _getSales(req, res, next) {
  getSales()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _deleteSale(req, res, next) {
  const saleid = req.params.saleid;
  deleteSale(saleid)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
module.exports = router;
