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
  removeSale,
  getSales,
} = require("./controller");

router.post(
  "/",
  [
    check("customerName", "toUser is required").not().isEmpty(),
    check("item", "toUser is required").not().isEmpty(),
    check("amount", "type is required").not().isEmpty(),
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

router.get("/", [fieldValidations], _getSales);

// NETWORK
function _createSale(req, res, next) {
  const { customerName, item, amount } = req.body;
  createSale(customerName, item, amount)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}


function _getSale(req, res, next) {
  const saleid = req.params.saleid;
  getSale(saleid)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _getSales(req, res, next) {
  getSales(saleid)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;

// router.get(
//   "/conversation/:cid/members",
//   [param("cid", "cid is required").not().isEmpty(), fieldValidations],
//   _getMembersFromConversation
// );

// function _getMembersFromConversation(req, res, next) {
//   const { uid } = req.body;
//   const cid = req.params.cid;
//   getMembersFromConversation(cid, uid)
//     .then((data) => {
//       response.success(req, res, data, 200);
//     })
//     .catch(next);
// }
