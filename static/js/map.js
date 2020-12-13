mapboxgl.accessToken = API_KEY;
var myMap = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-95, 40],
  zoom: 3.3
});
 
var years = [
  '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
  ]; 

myMap.on('load', function () {

  function filterBy(year) {
    
    var yearCode = year >= 2000 ? "1" + year.toString().substr(-2) :  year.toString().substr(-2);
    yearCode = (parseInt(yearCode) - 1);
    

    var filters = ['==', ['get', 'data_year'], yearCode];
    // var adminfilter = ['==', ['get', 'administration'], yearCode];

    // console.log(filters);

 
    myMap.setFilter('victim-circles', filters);

    // myMap.setFilter('victim-circles', null);
    myMap.setFilter('victim-labels', filters);
    
    // Set the label to the year
    
    document.getElementById('year').innerHTML = year.toString();
    // document.getElementById('admin').innerHTML = adminfilter.toString();

  }

  var geojsondata = "templates/mapdata.geojson";

  d3.json(geojsondata, function (err, data) {
      console.log(data);
      if (err) throw err;
      
      // Create a year property value based on time
      // used to filter against.
      data.features = data.features.map(function (d) {
        d.properties.data_year = new Date(d.properties.data_year).getYear();
        d.properties.victims = parseInt(d.properties.victims);
        d.properties.administration = d.properties.administration;

        // document.getElementById('admin').innerHTML = d.properties.administration.toString();
 
        // console.log(d);
        return d;
         
      });

      myMap.addSource('victims', {
          'type': 'geojson',
          data: data
        });
      
      myMap.addLayer({
      'id': 'victim-circles',
      'type': 'circle',
      'source': 'victims',
      'paint': {
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'victims'],
            1,
            '#FCA107',
            2246,
            '#7F3121'
            ],
          'circle-opacity': .75,
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'victims'],
            // circle radius
            1,
            20,
            2246,
            200
            ]
        }
      });

      myMap.addLayer({
        'id': 'victim-labels',
        'type': 'symbol',
        'source': 'victims',
        'layout': 
          {
            'text-field': '{state_abbr} {victims}',
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 14
        },
        'paint': {
            'text-color': 'rgba(0,0,0,0.5)'
        }
      });


 
    filterBy('1993');

    // console.log(data);

    // loop through data to find admin on correct year using for-loop
    // for (var i = 0; i < data.length; i++) {
    //   console.log(data[i].administration);
    // }
    // // get administration
    // var adminLabel = ['==', ['get', 'adminisration'], String]
    
    // // // Set label to administration
    
  });

 

  document.getElementById('slider').addEventListener('input', function(e) {
     var year = parseInt(years[e.target.value])
     filterBy(year);
    //  console.log(year)
  });
     
});
  
