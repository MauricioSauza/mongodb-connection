const { Schema, model } = require("mongoose");

const PersonSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
        city: {
          type: String
        },
        zone: {
          type: String
        },
        street: {
          type: String
        }
      }
  },
  { timestamps: true, collection: "Persons" }
);

PersonSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Person", PersonSchema);
