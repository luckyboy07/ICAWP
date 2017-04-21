  'use strict';

  var LocationArray = [{
      town_cities_name: 'Isabela City'
  }, {
      town_cities_name: 'Zamboanga City'
  }, {
      town_cities_name: 'Zamboanga del Norte'
  }, {
      town_cities_name: 'Zamboanga del Sur'
  }, {
      town_cities_name: 'Zamboanga Sibugay'
  }, {
      town_cities_name: 'Bukidnon'
  }, {
      town_cities_name: 'Cagayan de Oro City'
  }, {
      town_cities_name: 'Camiguin'
  }, {
      town_cities_name: 'Iligan City'
  }, {
      town_cities_name: 'Lanao del Norte'
  }, {
      town_cities_name: 'Misamis Occidental'
  }, {
      town_cities_name: 'Misamis Oriental'
  }, {
      town_cities_name: 'Compostela Valley'
  }, {
      town_cities_name: 'Davao City'
  }, {
      town_cities_name: 'Davao del Norte'
  }, {
      town_cities_name: 'Davao del Sur'
  }, {
      town_cities_name: 'Davao Oriental'
  }, {
      town_cities_name: 'Cotabato'
  }, {
      town_cities_name: 'Cotabato City'
  }, {
      town_cities_name: 'General Santos City'
  }, {
      town_cities_name: 'Sarangani'
  }, {
      town_cities_name: 'South Cotabato'
  }, {
      town_cities_name: 'Sultan Kudarat'
  }, {
      town_cities_name: 'Agusan del Norte'
  }, {
      town_cities_name: 'Agusan del Sur'
  }, {
      town_cities_name: 'Butuan City'
  }, {
      town_cities_name: 'Dinagat Islands'
  }, {
      town_cities_name: 'Surigao del Norte'
  }, {
      town_cities_name: 'Surigao del Sur'
  }, {
      town_cities_name: 'Basilan'
  }, {
      town_cities_name: 'Lanao del Sur'
  }, {
      town_cities_name: 'Maguindanao'
  }, {
      town_cities_name: 'Sulu'
  }, {
      town_cities_name: 'Tawi-Tawi'
  }];


var LocationArray2 = [{
  region: 'Northern Mindanao',
  regionalcenter: 'Cagayan de Oro City',
  Town_Cities: [{
    locationname: 'Bukidnon'
  }, {
    locationname: 'Cagayan de Oro City',
  }, {
    locationname: 'Camiguin',
  }, {
    locationname: 'Iligan City'
  }, {
    locationname: 'Lanao del Norte'
  }, {
    locationname: 'Misamis Occidental'
  }, {
    locationname: 'Misamis Oriental'
  }]
}, {
  region: 'Zamboanga Peninsula',
  regionalcenter: 'Pagadian City',
  Town_Cities: [{
    locationname: 'Isabela City'
  }, {
    locationname: 'Zamboanga City'
  }, {
    locationname: 'Zamboanga del Norte'
  }, {
    locationname: 'Zamboanga del Sur'
  }, {
    locationname: 'Zamboanga Sibugay'
  }]
}, {
  region: 'Davao Region',
  regionalcenter: 'Davao City',
  Town_Cities: [{
    locationname: 'Compostela Valley'
  }, {
    locationname: 'Davao City'
  }, {
    locationname: 'Davao del Norte'
  }, {
    locationname: 'Davao del Sur'
  }, {
    locationname: 'Davao Oriental'
  }]
}, {
  region: 'SOCCSKSARGEN',
  regionalcenter: 'Koronadal City',
  Town_Cities: [{
    locationname: 'Cotabato'
  }, {
    locationname: 'Cotabato City'
  }, {
    locationname: 'General Santos City'
  }, {
    locationname: 'Sarangani'
  }, {
    locationname: 'South Cotabato'
  }, {
    locationname: 'Sultan Kudarat'
  }]
}, {
  region: 'Caraga',
  regionalcenter: 'Butuan City',
  Town_Cities: [{
    locationname: 'Agusan del Norte'
  }, {
    locationname: 'Agusan del Sur'
  }, {
    locationname: 'Butuan City'
  }, {
    locationname: 'Dinagat Islands'
  }, {
    locationname: 'Surigao del Norte'
  }, {
    locationname: 'Surigao del Sur'
  }]
}, {
  region: 'Autonomous Region in Muslim Mindanao',
  regionalcenter: 'Cotabato City',
  Town_Cities: [{
    locationname: 'Basilan'
  }, {
    locationname: 'Lanao del Sur'
  }, {
    locationname: 'Maguindanao'
  }, {
    locationname: 'Sulu'
  }, {
    locationname: 'Tawi-Tawi'
  }]
}];



  module.exports = function(mongoose) {
      var location = mongoose.model('location');
      location.collection.drop();
      location.create(LocationArray);

      var location2 = mongoose.model('location2');
      location2.collection.drop();
      location2.create(LocationArray2);
  };
