// models
const Sale = require("../../models/sale");

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
      
      return sales;
      
  } catch (error) {
      console.log("error summarized by customerName: ", error);
  }
};

module.exports = {
  summarizedByItems,
  summarizedByCustomers
};
