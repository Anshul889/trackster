var Trackster = {};

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
    var htmlTrackRow =
      '<div class="row track">' +
      '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
      '    <a href="' + track.preview_url + '" target="_blank">' +
      '      <i class="fa fa-play-circle-o fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <div class="col-xs-4">' + track.name + '</div>' +
      '  <div class="col-xs-2">' + track.artists[0].name + '</div>' +
      '  <div class="col-xs-2">' + track.album.name + '</div>' +
      '  <div class="col-xs-2">' + track.popularity + '</div>' +
      '</div>';

    $trackList.append(htmlTrackRow);
  }
};

const API_KEY = 'dcf6bb7698a9340d3778f125954e8ae1';

Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=tiny&api_key=' + API_KEY + title,
    datatype: 'jsonp',
    success: function(response) {
      Trackster.renderTracks(response.tracks.items);
    }
  });
};