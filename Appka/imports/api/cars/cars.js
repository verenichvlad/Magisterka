import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Cars = new Mongo.Collection('cars');

const CarsSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  company: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: Number,
  },
  bodyType: {
    type: String,
  },
  color: {
    type: String,
  },
});

Cars.attachSchema(CarsSchema);

// PUBLICATIONS
if (Meteor.isServer) {
  Meteor.publish('getCarsForCurrentUser', function () {
    return Cars.find({ userId: this.userId });
  });

  Meteor.publish('getCar', carId => Cars.find({ _id: carId }));

  Meteor.publish('getAllCars', () => Cars.find());
}

export default Cars;
