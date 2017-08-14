import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Albums = new Mongo.Collection('albums');

if (Meteor.isServer) {
  Meteor.publish('albums', function albumsPublication() {
    return Albums.find();
  });
}

Meteor.methods({
  'albums.insert'(newAlbum) {
    check(newAlbum, Object);
    Albums.insert({
      albumName: newAlbum.albumName,
      artistName: newAlbum.artistName,
      albumUrl: newAlbum.albumUrl,
      sourceNodes: [],
      targetNodes: [],
      defaultAlbum: newAlbum.defaultAlbum,
      createdAt: new Date(), // current time
    });
  },
  'albums.updateRelationship'(relationship) {
    check(relationship, Object);
    Albums.update(
      { _id: relationship.source.albumId },
      { $push: { targetNodes: relationship.target } },
    );
    Albums.update(
      { _id: relationship.target.albumId },
      { $push: { sourceNodes: relationship.source } },
    );
  },
});
export default Albums;
