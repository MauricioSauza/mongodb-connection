// models
const Person = require("../../models/person");
// cache
const redisClient = require('../../cache/index');

const findPersonByCity = async (city) => {
    const personsDB = await Person.find({ "address.city": city });

    await redisClient.setex("findPersonByCity", 2, personsDB);
    
    return personsDB;
};

module.exports = {
  findPersonByCity
};
