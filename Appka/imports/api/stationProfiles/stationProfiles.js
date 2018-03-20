import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const StationProfiles = new Mongo.Collection('stationProfiles');

const GeoPositionObject = new SimpleSchema({
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
});

const StationProfilesSchema = new SimpleSchema({
  stationId: {
    type: String,
  },
  name: {
    type: String,
  },
  about: {
    type: String,
    optional: true,
  },
  score: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  isVerified: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
  geoPosition: {
    type: GeoPositionObject,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  stationPhone: {
    type: String,
    optional: true,
  },
  workTime: {
    type: String,
    optional: true,
  },

});

StationProfiles.attachSchema(StationProfilesSchema);

// PUBLICATIONS
if (Meteor.isServer) {
  Meteor.publish('getAllStationProfiles', () => StationProfiles.find());

  Meteor.publish('getProfileOfCurrentStation', function () {
    return StationProfiles.find({ stationId: this.userId });
  });
}

export default StationProfiles;
