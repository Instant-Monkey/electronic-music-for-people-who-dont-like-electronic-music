import { Meteor } from 'meteor/meteor';
import SpotifyWebApi from 'spotify-web-api-node';
import '../imports/api/albums.js';

Meteor.startup(() => {
  const spotifyApi = new SpotifyWebApi({
    clientId: Meteor.settings.private.clientId,
    clientSecret: Meteor.settings.private.clientSecret,
    redirectUri: 'http://localhost:3000//callback/',
  });

  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body.access_token);
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    });

  export default spotifyApi;
});
