import * as contactsServices from "../services/contactsServices.js";
//const contactsServices = require("../services/contactsServices");
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsServices.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.removeContact(id);
    if (result === null) {
      throw HttpError(404, "Contact not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await contactsServices.addContact(name, email, phone);
    if (!result) {
      throw HttpError(404);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//node app.js
