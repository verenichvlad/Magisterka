import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Valuations = new Mongo.Collection('valuations');

const PartSchema = new SimpleSchema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  term: {
    type: Number,
  },
});

const ValuationsSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  comment: {
    type: String,
  },
  evaluatedParts: {
    type: Array,
  },
  'evaluatedParts.$': {
    type: PartSchema,
  },
  totalPrice: {
    type: Number,
  },
  totalTermDays: {
    type: Number,
  },
  creationDate: {
    type: Date,
    optional: true,
    defaultValue: new Date(),
  },
});

Valuations.attachSchema(ValuationsSchema);

// PUBLICATIONS
if (Meteor.isServer) {
  Meteor.publish('getAllValuations', () => Valuations.find());
}

export default Valuations;
