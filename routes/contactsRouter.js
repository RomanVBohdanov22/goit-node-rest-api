import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../../goit-node-rest-api/controllers/contactsControllers.js";
//import {} from "../../controllers/contactsControllers.js"; чомусь не прцює!
import {
  createContactSchema,
  updateContactSchema,
} from "../../goit-node-rest-api/schemas/contactsSchemas.js";
import validateBody from "../../goit-node-rest-api/helpers/validateBody.js";
//import {} from "../../helpers/validateBody.js"; чомусь не прцює!
const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

export default contactsRouter;
