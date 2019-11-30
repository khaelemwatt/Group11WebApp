var paths = new Map();
/*
paths.set("Camperdown", "https://api.myjson.com/bins/8kef2");
paths.set("Camperdown Park", "https://api.myjson.com/bins/1a2pj2");
paths.set("Camperdown Park Loop", "https://api.myjson.com/bins/12e7tq");
paths.set("Dowfield Circular", "https://api.myjson.com/bins/1a6zum");
paths.set("Dundee City Loop", "https://api.myjson.com/bins/hm6ta");
paths.set("Dundee to Forfar Circuit", "https://api.myjson.com/bins/cbfj2");
paths.set("Monifieth Loop", "https://api.myjson.com/bins/vdavy");
paths.set("Novice Run", "https://api.myjson.com/bins/wk63i");
paths.set("Sidlaw Court Dundee", "https://api.myjson.com/bins/133xr2");
paths.set("Tay Bridge Loop", "https://api.myjson.com/bins/9xp3y");
paths.set("Tay Rail Bridge Loop", "https://api.myjson.com/bins/1a950e");
*/
paths.set("Old Hawkhill", "https://api.myjson.com/bins/wnosm");
paths.set("Magdalen Yard", "https://api.myjson.com/bins/m6gjq");
paths.set("Sycamore", "https://api.myjson.com/bins/1ezu86");
paths.set("Unit 2 Ballingall", "https://api.myjson.com/bins/tk8g6");
paths.set("Myrekirk", "https://api.myjson.com/bins/lxvwm");
paths.set("Law", "https://api.myjson.com/bins/zmuti");

function loadLayer(routeName)
{
  fetch(paths.get(routeName))
    .then((resp) => resp.json())
    .then(function (route) {
      map.addLayer({
        "id": routeName,
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": route.waypoints,
            },
          },
        },
        "layout": {
        "line-join": "round",
        "line-cap": "round",
        },
        "paint": {
        "line-color": "#009100", //route.data.color,
        "line-width": 2,
      },
      });
    });
}

window.onload = function()
{
  for(let k of paths.keys())
  {
    loadLayer(k)
  }
}
