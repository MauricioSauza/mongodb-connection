// package
const { response } = require("express");

// models
const Person = require("../../models/person");

// mdlw
const error = require("../../utils/error");

const createPerson = async (firstName, lastName, phone, address) => {
  const personDB = new Person({ firstName, lastName, phone, address });

  await personDB.save();

  return personDB;
};

const getPerson = async (personid) => {
  const personDB = await Person.findById(personid);
  if (!personDB) {
    throw error(`person id not found`, 401);

    return;
  }

  return personDB;
};
const updatePerson = async (personid, data) => {
  const personDB = await Person.findByIdAndUpdate(
    personid,data,
    { new: true }
  );

  if (!personDB) {
    throw error(`person id not found`, 401);
    return;
  }

  return personDB;
};

const deletePerson = async (personid) => {
  const personDB = await Person.findByIdAndDelete(personid);

  if (!personDB) {
    throw error(`person id not found`, 401);
    return;
  }

  return true;
};

const getPersons = async () => {
  const personsDB = await Person.find();
  if (!personsDB) {
    throw error(`persons not found`, 401);
    return;
  }

  return personsDB;
};

module.exports = {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
  getPersons,
};
