//У файл `contactsServices.js` (знаходиться в папці `services`)
// скопіюй функції з файла `contacts.js` з домашнього завдання до модуля 1.

const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const { dirname } = require("path");
const { fileURLToPath } = require("url");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "../db/contacts.json");

//переписав деякі функції як стрілкові
const listContacts = async () => {
  // Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
};

// Залишу класичний запис function
async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  //Повертає об'єкт доданого контакту (з id).
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

async function updateContact(id, body) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

/*
npm install
    S або --save – модуль встановлюється як основна залежність. Значить, що модуль необхідний для нормального функціонування програми.
    D або --save-dev – означає, що модуль встановиться як додаткова залежність. В основному модуль потрібний для розробки і в ньому немає необхідності під час роботи програми.

    базові (core modules)
    файлові (file modules)
    npm-модулі (npm modules)
    */
