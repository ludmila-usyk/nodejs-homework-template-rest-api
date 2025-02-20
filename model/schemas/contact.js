const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
    features: {
      type: Array,
      set: data => (!data ? [] : data),
      get: data => data.sort(),
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

contactsSchema.path('name').validate(value => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

contactsSchema.plugin(mongoosePaginate);
const Contacts = model('contacts', contactsSchema);

module.exports = Contacts;