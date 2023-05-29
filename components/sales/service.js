// models
const Sale = require("../../models/sale");

// package
const { response } = require("express");

//cache 
const redisClient = require('../../cache/index');

const error = require("../../utils/error");
const { get } = require("mongoose");

const createSale = async (customerName, item, amount) => {
  const saleDB = new Sale({ customerName, item, amount });

  await saleDB.save();

  return saleDB;
};

const getSale = async (saleid) => {
  const saleDB = await Sale.findById(saleid);
  if (!saleDB) {
    throw error(`sale id not found`, 401);
    return;
  }

  return saleDB;
};
const updateSale = async (saleid, data) => {
  const saleDB = await Sale.findByIdAndUpdate(saleid, data, { new: true });
  if (!saleDB) {
    throw error(`sale id not found`, 401);
    return;
  }

  return saleDB;
};

const deleteSale = async (saleid) => {
  const saleDB = await Sale.findByIdAndDelete(saleid);

  if (!saleDB) {
    throw error(`sale id not found`, 401);
    return;
  }

  return true;
};

const getSales = async () => {
  const salesDB = await Sale.find();
  if (!salesDB) {
    throw error(`sales not found`, 401);
    return;
  }

  return salesDB;
};

const summarizedByItems = async () => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: "$item",
          totalVentas: {
            $sum: "$amount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          item: "$_id",
          totalVentas: 1,
        },
      },
    ]);

    await redisClient.setex("summarizedByItems", 2, sales);

    return sales;
  } catch (error) {
    console.log("error summarized by items: ", error);
  }
};

const summarizedByCustomers = async () => {

  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: "$customerName",
          totalVentas: {
            $sum: "$amount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          customerName: "$_id",
          totalVentas: 1,
        },
      },
    ]);
    await redisClient.setex("summarizedByCustomers", 10, sales);

    return sales;
  } catch (error) {
    console.log("error summarized by customerName: ", error);
  }
};

module.exports = {
  createSale,
  getSale,
  updateSale,
  deleteSale,
  getSales,
  summarizedByItems,
  summarizedByCustomers,
};
