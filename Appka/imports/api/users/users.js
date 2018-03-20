import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Schema = {};

Schema.UserProfile = new SimpleSchema({
  name: {
    type: String,
    optional: true,
    defaultValue: 'Client',
  },
  phoneNumber: {
    type: String,
    optional: true,
  },
  joinDate: {
    type: Date,
    optional: true,
    defaultValue: new Date(),
  },
  userType: {
    type: String,
    allowedValues: [
      'tstation', 'admin', 'cowner', 'partner',
    ],
    denyUpdate: true,
  },
  allowPhoneNotifications: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
  allowEmailNotifications: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  heartbeat: {
    type: Date,
    optional: true,
  },

  profile: {
    type: Schema.UserProfile,
    optional: true,
  },
});

Meteor.users.attachSchema(Schema.User);
