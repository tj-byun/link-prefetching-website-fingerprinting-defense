_satellite.pushAsyncScript(function(event, target, $variables){
  var qs=window.location.search; // grabs query string from page
if (qs.match(/marketing\_paid\_tp\_cne\_oo\_outbrain.*/g)) {
  _cne.conversion_pixels = {
    'cne:video:start': [
      { url: 'https://traffic.outbrain.com/network/trackpxl?advid=15606&action=view', repeat: true }
    ]
  };
}
 
});
