const MANUFACTORING = [[10,11,12],[13,14],[16,17],[19,20],[23],[24,25],[26,27],[28,29,30],[31,32]];
const MINING = [5,7,8];
const TRANSPORT = 49;
const RESEARCH = 72;
const ENERGETICS = 35;
const CONSTRUCTION = 42;
const AGRICULTURE = 1;
const url = '../data/monotowns_sorted.json';

function containsAny(source,target){
  target = target.toString().split(",");
  var result = source.filter(function(item){ return target.indexOf(item) > -1});
  return (result.length > 0);
}

function defaultMap(map){
  var circles = []
  $.getJSON(url, function(towns){
    $.each(towns, function(i, v){
      LatLng = new google.maps.LatLng(v[3], v[4]);
      var color;
      if(v[2] >= 500000){color='#FFFF00';}
      else if(v[2] >= 100000 && v[2] < 500000){color='#FF8800';}
      else if(v[2] >= 50000 && v[2] < 100000){color='#0000FF';}
      else if(v[2] >= 10000 && v[2] < 50000){color='#00FF00';}
      else {color='#FF0000';}
      circles.push(new google.maps.Circle({
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.55,
        map: map,
        center: LatLng,
        radius: Math.sqrt(v[2]) * 300
      }));
    });
  });
}

function heatMap(map){
  var heatMapData = [];

  $.getJSON(url, function(towns){
    $.each(towns, function(i, v){
      LatLng = new google.maps.LatLng(v[3], v[4]);
      heatMapData.push({location: LatLng, weight: Math.log10(v[2])/5});
    });
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
}

function typeMap(map){
  var circles = [];
  $.getJSON(url, function(towns){
    $.each(towns, function(i, v){
      var color;
      var dual = 0;
      if(containsAny(v[5],MINING)){color="#FF0000";dual++;}
      if(containsAny(v[5],MANUFACTORING)){color="#0000FF";dual++;}
      if(containsAny(v[5],TRANSPORT)){color="#FF7F00";dual++;}
      if(containsAny(v[5],RESEARCH)){color="#FFFF00";dual++;}
      if(containsAny(v[5],ENERGETICS)){color="#00FF00";dual++;}
      if(containsAny(v[5],CONSTRUCTION)){color="#800080";dual++;}
      if(containsAny(v[5],AGRICULTURE)){color="#B57EDC";dual++;}
      if(dual > 1)color="#FFCBDB";

      LatLng = new google.maps.LatLng(v[3], v[4]);

      circles.push(new google.maps.Circle({
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.55,
        map: map,
        center: LatLng,
        radius: Math.sqrt(v[2]) * 300
      }));
    });
  });
}
