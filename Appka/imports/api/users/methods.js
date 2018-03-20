import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'users.updateCurrent': function ({
    name, phone, email, password,
  }) {
    if (!this.userId) {
      throw new Meteor.Error('Вы не авторизированы, обновите страницу!');
    }

    if (name) {
      Meteor.users.update({ _id: this.userId }, {
        $set: {
          'profile.name': name,
        },
      });
    }

    if (phone) {
      Meteor.users.update({ _id: this.userId }, {
        $set: {
          'profile.phoneNumber': phone,
        },
      });
    }

    if (email) {
      const currentUser = Meteor.user();
      const oldEmail = currentUser.emails[0].address;
      if (email !== oldEmail) {
        Accounts.addEmail(this.userId, email);
        Accounts.removeEmail(this.userId, oldEmail);
      }
    }

    if (password) {
      Accounts.setPassword(this.userId, password);
    }
  },

  'users.updateNotificationSettings': function ({ allowPhoneNotifications, allowEmailNotifications }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (allowPhoneNotifications) {
      Meteor.users.update({ _id: this.userId }, {
        $set: {
          'profile.allowPhoneNotifications': allowPhoneNotifications,
        },
      });
    }
    if (allowEmailNotifications) {
      Meteor.users.update({ _id: this.userId }, {
        $set: {
          'profile.allowEmailNotifications': allowEmailNotifications,
        },
      });
    }
  },
});
