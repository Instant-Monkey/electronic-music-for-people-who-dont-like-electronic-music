import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Future from 'fibers/future';
import wiki from 'wikijs';
import spotifyApi from './main.js';

Meteor.methods({
  getAlbumWithId: (id) => {
    check(id, String);
    const future = new Future();
    spotifyApi.getAlbum(id)
      .then(function(album) {
        future.return(album.body.artists[0].name);
      }, function(err) {
        console.error(err);
      });
    return future.wait();
  },
  searchForAlbums: (query) => {
    check(query, String);
    const future = new Future();
    spotifyApi.searchAlbums(query, { limit: 20, offset: 0 })
      .then(function(data) {
        future.return(data.body.albums.items);
      }, function(err) {
        console.error(err);
      });
    return future.wait();
  },
  searchForArtists: (query) => {
    check(query, String);
    const future = new Future();
    spotifyApi.searchArtists(query, { limit: 5, offset: 0 })
      .then(function(data) {
        future.return(data.body.artists.items);
      }, function(err) {
        console.error(err);
      });
    return future.wait();
  },
  getArtistWithId: (id) => {
    check(id, String);
    const future = new Future();
    spotifyApi.getArtist(id)
      .then(function(data) {
        future.return(data.body);
      }, function(err) {
        console.error(err);
      });
    return future.wait();
  },
  getWikiSummary: (pageId) => {
    check(pageId, String);
    const wikiFr = wiki();
    const promisedResult = wikiFr.page(pageId)
      .then(data => (
        data.summary()
      )).then(result => (
        result
      ));
    return promisedResult;
  },
  checkAdminId: (id) => {
    check(id, String);
    const adminId = Meteor.settings.private.admin_id;
    if (id === adminId) {
      return true;
    }
    return false;
  },
});
