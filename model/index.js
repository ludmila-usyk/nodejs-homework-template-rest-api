import fs from 'fs'
import path from 'path'
import { randomUUID } from "crypto"
import contacts from './contacts.json'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contacts = await listContacts();
const listContacts = async () => {

  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contact] = contacts.find(contact => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const index = contacts.findIndex(contact => contact.id === contactId)
  if (index !== -1) {
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    )
    return result
  }
  return null
}

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContact 
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({id}) =>id === Number(contactId))
  if (contactIndex === -1) {
    return null
  }
  contacts[conactsIndex] = { ...contacts[conactsIndex], ...body };
  await fs.writeFile(contactsPath, json.stringify(contacts));
  return contacts[conactsIndex]
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}