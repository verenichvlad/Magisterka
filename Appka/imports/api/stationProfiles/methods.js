import { Meteor } from 'meteor/meteor';
import StationProfiles from './stationProfiles';

Meteor.methods({
  'stationProfiles.updateStationProfile': function (profile) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (StationProfiles.findOne({ stationId: this.userId })) {
      const selector = { stationId: this.userId };
      const modifier = {
        $set: profile,
      };

      StationProfiles.update(selector, modifier);
    } else {
      profile.stationId = this.userId;
      StationProfiles.insert(profile);
    }
  },

  'stationProfiles.increaseRating': function (value) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const profile = StationProfiles.findOne({ stationId: this.userId });

    const selector = { stationId: this.userId };
    const modifier = {
      $set: {
        score: profile.score + value,
      },
    };

    StationProfiles.update(selector, modifier);
  },
});
