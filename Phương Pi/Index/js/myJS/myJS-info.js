var map;
var markers = [];
var latitude=null;
var longitude=null;
var geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
	var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 20.996004, lng: 105.808000},
    zoom: 15
  });
  google.maps.event.addListener(map,'click', function(event) {
      addMarker(event.latLng);
      geocoder.geocode( { 'location': event.latLng}, function(results, status) {
        if (status == 'OK') {
          var address = results[0].formatted_address;
          document.getElementById('selectAddress').title = address;
          if(address.length >= 25){
            var c = address.substr(0,25);
            address = c+' ...';
          }
          document.getElementById('selectAddress').innerHTML = address;
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
      latitude = event.latLng.lat();
      longitude = event.latLng.lng();
  });
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: 20.996004, lng: 105.808000},
  });
  directionsDisplay.setMap(map);
  var onChangeHandler = function() {
   	calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('showKC').addEventListener('click', onChangeHandler);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  if(latitude==null && longitude==null){
    FindMe();
  };
  directionsService.route({
    origin: {lat: latitude, lng: longitude},
    destination: {lat: 20.996004, lng: 105.808000},
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      //get direction info
      var htmlReturn = '';
      var route = response.routes[0];
      htmlReturn += "Khoảng: <strong>" + route.legs[0].distance.text + "</strong>, Đi trong: <strong>" + route.legs[0].duration.text + "</strong>";
      document.getElementById('kc').innerHTML  = htmlReturn;
    } 
    else {
        window.alert('Directions request failed due to ' + status);
    }
  });
}

function FindMe(){
  if (latitude==null&&longitude==null) {
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(selectMyPosition);
    }
  }
  else{
    map.setCenter({lat:latitude, lng:longitude});
  }
}
function addMarker(location) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  var marker = new google.maps.Marker({
    position: location,
    animation: google.maps.Animation.DROP,
    map: map
  });
  markers.push(marker);
}
function selectMyPosition(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  var marker = new google.maps.Marker({
    position: {lat: latitude,lng: longitude},
    draggable: true,
    animation: google.maps.Animation.DROP,
    map: map
  });
  markers.push(marker);
}

function goToThisLocation(){
  map.setCenter({lat: 20.996004, lng: 105.808000});
}



var n=0;
function fadeLogin(){
    if(n==0){
        $('#login-dp').fadeIn(300);
        n++;
    }else{
        $('#login-dp').fadeOut(300);
        n--;
    }
}
$(document).ready(function () {
    var showChar57 = 57;
    $('.hidden-57').each(function() {
        var content = $(this).html();
        if(content.length > showChar57) {
            var c = content.substr(0, showChar57);
            var html = c + ' ...';
            $(this).html(html);
        }
 
    });
    var showChar17 = 17;
    $('.hidden-17').each(function() {
        var contentAddress = $(this).html();
        if(contentAddress.length > showChar17) {
            var c = contentAddress.substr(0, showChar17);
            var html = c + ' ...';
            $(this).html(html);
        }
    });

    var showChar27 = 27;
    $('.hidden-27').each(function() {
        var contentAddress = $(this).html();
        if(contentAddress.length > showChar27) {
            var c = contentAddress.substr(0, showChar27);
            var html = c + ' ...';
            $(this).html(html);
        }
    });

    var showChar12 = 12;
    $('.hidden-12').each(function() {
        var contentAddress = $(this).html();
        if(contentAddress.length > showChar12) {
            var c = contentAddress.substr(0, showChar12);
            var html = c + ' ...';
            $(this).html(html);
        }
    });

    var showChar278 = 278;
    $('.hidden-278').each(function() {
        var contentAddress = $(this).html();
        if(contentAddress.length > showChar278) {
            var c = contentAddress.substr(0, showChar278);
            var html = c + ' ...';
            $(this).html(html);
        }
    });
});