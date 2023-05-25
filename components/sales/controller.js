// package
const { response } = require("express");

// models
const Sale = require("../../models/sale");

const createSale = async (customerName, item, amount) => {
  const saleDB = new Sale({ customerName, item, amount });

  await saleDB.save();

  return saleDB;
};

const getSale = async (saleid) => {
  const saleDB = await Sale.findById(saleid);
  if (!saleDB) {
    throw error ;
    return;
  }

  return saleDB;
};
const updateSale = async (saleid, data) => {
  const saleDB = await Sale.findByIdAndUpdate(saleid, data, { new: true });
  if (saleDB == undefined) {
    return false;
  }

  return true;
};

const deleteSale = async (saleid) => {
  const saleDB = await Sale.findByIdAndDelete(saleid);

  if (saleDB == undefined) {
    return false;
  }

  return true;
};

const getSales = async () => {
  const salesDB = await Sale.find();
  if (salesDB == undefined) {
    return undefined;
  }

  return salesDB;
};

module.exports = {
  createSale,
  getSale,
  updateSale,
  deleteSale,
  getSales,
};
