const response = require("../../helpers/network/response");
const error = require("../../helpers/network/errors");

const {
  createSale,
  deleteSale,
  getSale,
  getSales,
  summarizedByCustomers,
  summarizedByItems,
  updateSale,
} = require("./service");

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

// Service
function _summarizedByItems(req, res, next) {
  summarizedByItems()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function _summarizedByCustomers(req, res, next) {
  summarizedByCustomers()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = {
  _createSale,
  _getSale,
  _updateSale,
  _getSales,
  _deleteSale,
  _summarizedByItems,
  _summarizedByCustomers,
};
