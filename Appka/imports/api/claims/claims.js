import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Claims = new Mongo.Collection('claims');

const ClaimsSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  claims: {
    type: String,
  },
  problematicMediaIds: {
    type: Array,
    optional: true,
  },
  'problematicMediaIds.$': {
    type: String,
  },
  comment: {
    type: String,
  },
  issuedByTechStation: {
    type: Boolean,
    defaultValue: false,
  },
});

Claims.attachSchema(ClaimsSchema);

// PUBLICATIONS
if (Meteor.isServer) {
  Meteor.publish('getAllClaims', () => Claims.find());
}

export default Claims;
