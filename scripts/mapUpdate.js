var paths = new Map();
paths.set("Old Hawkhill", "https://api.myjson.com/bins/wnosm");
paths.set("Magdalen Yard", "https://api.myjson.com/bins/m6gjq");
paths.set("Sycamore", "https://api.myjson.com/bins/1ezu86");
paths.set("Unit 2 Ballingall", "https://api.myjson.com/bins/tk8g6");
paths.set("Myrekirk", "https://api.myjson.com/bins/lxvwm");
paths.set("Law", "https://api.myjson.com/bins/zmuti");

function loadLayer(routeName, map)
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

function loadAllLayers(map)
{
  for(let k of paths.keys())
  {
    loadLayer(k, map)
  }
}
