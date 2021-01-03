var map;

function copyText(str) {
  let c = map.getCenter();
  let d = 0;
  if (map.getZoom() <= 5)
    d = 1;
  else if (map.getZoom() <= 8)
    d = 2;
  else if (map.getZoom() <= 11)
    d = 3;
  else if (map.getZoom() <= 14)
    d = 4;
  else if (map.getZoom() <= 17)
    d = 5
  else
    d = 6;

  str = str.replace('{lat}', c.lat.toFixed(d)).replace('{lon}', c.lng.toFixed(d));
  navigator.clipboard.writeText(str)
    .then(function() {
      document.getElementById('note').style.display = 'block';
      window.setTimeout(function() {
        document.getElementById('note').style.display = 'none';
      }, 1000);
    })
    .catch(function(err) { alert('Error when copying: ', err); });
}

window.onload = function() {
  map = L.map('map', { doubleClickZoom: false }).setView([45, 20], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
  var m = L.marker(map.getCenter()).addTo(map);
  map.on('drag zoom', function(e) {
    m.setLatLng(map.getCenter());
  });
  map.addHash();

  L.functionButtons([
    { content: 'Copy lat, lon', callback: function() {
      copyText('{lat}, {lon}')
    }},
    { content: 'Copy WKT', callback: function() {
      copyText('POINT({lon} {lat})')
    }},
    { content: 'Copy wikipedia', callback: function() {
      copyText('{{Coord|{lat}|{lon}|display=title}}')
    }},
    { content: 'Copy URL', callback: function() {
      copyText('' + window.location)
    }}
  ], {position: 'topleft'}).addTo(map);
}
