import Claims from './claims';

Meteor.methods({
  'claims.createClaim': function (claim) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    claim.userId = this.userId;

    Claims.insert(claim);
  },
});
