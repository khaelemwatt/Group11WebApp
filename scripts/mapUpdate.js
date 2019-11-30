var paths = new Map();
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

paths.set("Test", "https://api.myjson.com/bins/m6gjq");

var currentRoute = undefined;

function displayLayer(routeName)
{
  if(currentRoute != null) //Also checks for undefined, which is what we actually need
  {
      map.setLayoutProperty(currentRoute, "visibility", "none");
  }

  if(map.getLayer(routeName) == null)
  {
    loadLayer(routeName)
    .then(() => map.setLayoutProperty(routeName, "visibility", "visible"));
    currentRoute = routeName;
  }
  else
  {
    map.setLayoutProperty(routeName, "visibility", "visible")
    currentRoute = routeName;
  }
}

function loadLayer(routeName)
{
  return fetch(paths.get(routeName))
    .then((resp) => resp.json())
    .then(function (route) {
      console.log(route);
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
        "visibility": "none",
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
  document.getElementById("Novice-Run").onclick = function() {
    displayLayer("Test");
  }

  document.getElementById("Camperdown").onclick = function() {
    displayLayer("Camperdown");
  }
}
