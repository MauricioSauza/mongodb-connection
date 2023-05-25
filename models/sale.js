const { Schema, model } = require("mongoose");

const SaleSchema = Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, collection: "sales" }
);

SaleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Sale", SaleSchema);
