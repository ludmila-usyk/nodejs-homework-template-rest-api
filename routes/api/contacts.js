const express = require('express')
const router = express.Router();
const { Contact, joiShema } = require("../../model/contacts");
const { NotFound, BadRequest } = require("http-errors");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact)
  } catch (err) {
    if (err.message.incudes("Cast to ObjectId failed")) {
      err.status = 404;
    }
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { err } = joiShema.validate(req.body);
    if (err) {
      throw new BadRequest("missing required name field");
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact)
  } catch (err) {
    if (err.message.incudes("validation failad")) {
      err.status = 400;
    }
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndDelete(contactId);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json("message: delete contact")
  } catch (err) {
    next(err)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
      const { error } = joiShema.validate(req.body);
    if (error) {
      throw new BadRequest("message: missing fields");
    }
    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
       new: true 
       });
       res.json(updateContact);
  } catch (err) {
    if (err.message.incudes("validation failad")) {
      err.status = 400;
    }
    next(err);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (error) {
      throw new BadRequest("message: missing fields");
    }
    const { contactId } = req.params;
    const { favorite = false } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true },
    );
    res.json(updateContact);
  } catch (err) {
    if (e.message.includes("validation failad")) {
      err.status = 400;
    }
    next(err);
  }
});

module.exports = router