import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(err => new Meteor.Error(400, err.message));

SimpleSchema.debug = true;
