import { Meteor } from 'meteor/meteor';
import Orders from './orders';
import UserFiles from '../userFiles/userFiles';

Meteor.methods({
  'orders.insertForCurrentUser': function (order) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    order.userId = this.userId;

    const newOrderId = Orders.insert(order);

    UserFiles.update({ 'meta.orderId': this.userId }, {
      $set: {
        'meta.orderId': newOrderId,
      },
    });
  },

  'orders.updateForCurrentUser': function (orderId, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const selector = { _id: orderId, userId: this.userId };
    const modifier = {
      $set: updates,
    };

    Orders.update(selector, modifier);
  },
});
