// models
const Person = require("../../models/person");

const findPersonByCity = async (city) => {
    const personsDB = await Person.find({ "address.city": city });
    return personsDB;
};

module.exports = {
  findPersonByCity
};
