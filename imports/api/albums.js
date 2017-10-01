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
  'albums.insertAlbum'(newAlbum) {
    check(newAlbum, Object);
    const searchedAlbum = Albums.findOne({
      albumId: newAlbum.albumId,
    });
    if (searchedAlbum == null) {
      Albums.insert({
        type: 'album',
        albumInfo: {
          albumName: newAlbum.albumInfo.albumName,
          albumUrl: newAlbum.albumInfo.albumUrl,
          SpotifyAlbumObject: newAlbum.albumInfo.SpotifyAlbumObject,
        },
        artistInfo: newAlbum.artistId,
        sourceNodes: [],
        targetNodes: [],
        albumId: newAlbum.albumId,
        createdAt: new Date(), // current time
      });
    }
  },
  'albums.insertArtist'(newArtist) {
    check(newArtist, Object);
    const searchedArtist = Albums.findOne({
      artistId: newArtist.artistId,
    });
    if (searchedArtist) {
      Albums.update(
        { artistId: searchedArtist.artistId },
        { $push: { albums: newArtist.album } });
    } else {
      Albums.insert({
        type: 'artist',
        artistInfo: {
          artistName: newArtist.artistInfo.artistName,
          SpotifyArtistObject: newArtist.artistInfo.SpotifyArtistObject,
        },
        albums: [newArtist.album],
        artistId: newArtist.artistId,
        createdAt: new Date(), // current time
      });
    }
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
