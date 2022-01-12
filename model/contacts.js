const { Schema, model } = require("mongoose");
const Joi = require("Joi")

const contactSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true },
);

const joiShema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool,
});

const Contact = model("contact", contactSchema);

module.exports = {Contact, joiShema};