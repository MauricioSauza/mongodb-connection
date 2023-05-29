// package
const express = require("express");
const { query, param, check } = require("express-validator");
const error = require("../../helpers/network/errors");

const router = express.Router();

const { fieldValidations } = require("../../middlewares/field-validations");
const { cacheMiddleware } = require("../../middlewares/cache/redis-cache");

const {
  _createSale,
  _getSale,
  _updateSale,
  _getSales,
  _deleteSale,
  _summarizedByItems,
  _summarizedByCustomers,
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

router.get("/summarized/items", [cacheMiddleware("summarizedByItems")], _summarizedByItems);
router.get("/summarized/customers", [cacheMiddleware("summarizedByCustomers")],_summarizedByCustomers);

router.delete(
  "/:saleid",
  [
    param("saleid", "saleid param is required").not().isEmpty(),
    fieldValidations,
  ],
  _deleteSale
);

module.exports = router;
