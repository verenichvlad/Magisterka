import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Orders = new Mongo.Collection('orders');

const OrdersSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  carId: {
    type: String,
  },
  parts: {
    type: String,
  },
  location: {
    type: String,
  },
  maxDistance: {
    type: Number,
  },
  deadline: {
    type: Date,
  },
  desiredFix: {
    type: String,
  },
  comment: {
    type: String,
  },
  moderationPassed: {
    type: Boolean,
    defaultValue: false,
  },
  creationDate: {
    type: Date,
    optional: true,
    defaultValue: new Date(),
  },
});

Orders.attachSchema(OrdersSchema);

// PUBLICATIONS
if (Meteor.isServer) {
  Meteor.publish('getOrdersForCurrentUser', function () {
    return Orders.find({ userId: this.userId });
  });

  Meteor.publish('getAllOrders', () => Orders.find());
}

export default Orders;
