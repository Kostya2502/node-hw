const fs = require('fs').promises;
const path = require('path');
const { uuid } = require('uuidv4');

const contactsPath = path.resolve(__dirname, 'db/contacts.json');

async function listContacts() {
    const result = await fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
    });
    const contacts = JSON.parse(result);
    console.table(contacts)
}

async function getContactById(contactId) {
    const result = await fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
    });
    const contacts = JSON.parse(result);
    const contactsById = contacts.filter(({ id }) => id === contactId)
    console.table(contactsById)
}

async function removeContact(contactId) {
    const result = await fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
    })
    const contacts = JSON.parse(result);
    const contactsById = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contactsById), function (error) { if (error) { throw error } })
    console.table(contactsById)
}

async function addContact(name, email, phone) {
    const result = await fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
    });
    const contacts = JSON.parse(result);
    const addContact = { id: uuid(), name, email, phone }
    const newContacts = [...contacts, addContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => { if (err) throw err; })
    console.table(newContacts)
}

module.exports = { listContacts, getContactById, removeContact, addContact };