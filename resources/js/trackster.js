var Trackster = {};
const API_KEY = 'dcf6bb7698a9340d3778f125954e8ae1';
$(document).ready(function() {
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-input').val());
  });
});
Trackster.renderTracks = function(tracks) {
  var $trackList = $('#track-list');
  $trackList.empty();
  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var mediumAlbumArt = track.image[1]["#text"];
    var htmlTrackRow =
      '<div class="row track">' +
      '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
      '    <a href="' + track.preview_url + '" target="_blank">' +
      '      <i class="fa fa-play-circle-o fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <div class="col-xs-4">' + track.name + '</div>' +
      '  <div class="col-xs-2">' + track.artist + '</div>' +
      // '  <div class="col-xs-2">' + track.album + '</div>' +
      '  <div class="col-xs-2"><img src="' + mediumAlbumArt + '"/></div>' +
      '  <div class="col-xs-2">' + track.popularity + '</div>' +
      '</div>';
    $trackList.append(htmlTrackRow);
  }
};

Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track= " + title + "&api_key=" + API_KEY+ '&format=json',
    datatype: 'jsonp',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
