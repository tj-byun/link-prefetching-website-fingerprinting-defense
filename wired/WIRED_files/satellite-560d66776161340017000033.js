_satellite.pushAsyncScript(function(event, target, $variables){
  if (window.location.search.match(/marketing\_paid\_tp\_cne\_oo\_taboola.*/g)) {
  var randomNumber = Math.floor((Math.random() * 1000) + 1);
  var pageUrl = encodeURIComponent(document.URL);
  _cne.conversion_pixels = {
    'cne:video:start': [
      { url: 'http://trc.taboola.com/cne-thescene-sc/log/3/action?tim=' + randomNumber + '&item-url=' + pageUrl + '&name=video_view', repeat: true }
    ]
  };
}
});
