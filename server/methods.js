import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Future from 'fibers/future';
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
});
