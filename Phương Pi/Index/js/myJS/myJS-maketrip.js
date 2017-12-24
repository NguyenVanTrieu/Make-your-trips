var map;
var infowindows = [];
var markers = [];
var address = [];
var subaddress = [];
var mymarkers = [];
// các mảng cần gửi qua ajax
var myaddress = [];
var mysubaddress = [];
var lats = [];
var lngs = [];
var startTimes = [];
var endTimes = [];
var notes = [];
var states = [];
// end
var service;
var defaultLocation;
var flag = 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Flag--Pink.png';
function initMap() {
    defaultLocation = new google.maps.LatLng(20.996004,105.808000);
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 20.996004, lng: 105.808000},
      zoom: 15
    });
    var marker = new google.maps.Marker({
      map: map,
      position: {lat: 20.996004, lng: 105.808000},
      icon: flag
    });

    var iamhere = document.getElementById('iamhere');
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(iamhere);
    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }
      createMarker(place.geometry.location);
      markers.push(marker);
    });
    google.maps.event.addListener(map,'click', function(event) {
      createMarker(event.latLng);
    })
}
function createMarker(place) {
  var image = "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Bubble-Chartreuse.png";
  var marker = new google.maps.Marker({
      map: map,
      position: place,
      icon: image,
      animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
  var infowindow = new google.maps.InfoWindow({
    maxWidth: 200
  });
  infowindows.push(infowindow);
  var m = infowindows.length-1;
  var geocoder = new google.maps.Geocoder();
  marker.addListener('click', function() {
    geocoder.geocode( {'location': place}, function(results, status) {
      infowindows[m].setContent(results[0].formatted_address+"<hr><div><button title='Xóa' onclick='deleteMarker("+m+")' class='buttons'><i class='fa fa-times fa-lg'></i></button><button title='Ghim cờ' onclick='changeDefaultLocation("+m+")' class='buttons'><i class='fa fa-flag-o fa-lg'></i></button><button title='Ghi chú' onclick='setContentForm("+m+")' class='buttons'><i class='fa fa-pencil fa-lg'></i></button></div>");
      infowindows[m].open(map, marker);
    });
  });
  geocoder.geocode({'location': place}, function(results, status) {
    address.push(results[0].formatted_address);
    subaddress.push(results[0].address_components[0].short_name+', '+results[0].address_components[1].short_name);
  });
}
function getAddressAndsubaddress(place){
  for (var i = 0; i < markers.length; i++) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': markers[i].getPosition()}, function(results, status){
      address[i] = results[0].formatted_address;
      subaddress[i] =  results[0].address_components[0].short_name+', '+results[0].address_components[1].short_name;
    });
  }
  alert(address);
}
function setContentForm(m){ 
  infowindows[m].setContent("<label>Giờ bắt đầu</label><input class='form-control' id='Start-time-"+m+"' type='datetime-local' name='Starttime' required='required'><br><label>Giờ kết thúc</label><input class='form-control' id='End-time-"+m+"' type='datetime-local' name='Endtime' required='required'><br><label>Ghi chú</label><input class='form-control' id='note-"+m+"' type='text' name='txt' required='required'><br><label>Trạng thái</label><select class='form-control' id='state'><option value='1'>Điểm bắt đầu</option><option value='2'>Điểm kết thúc</option><option value='3'>Nghỉ ngơi</option><option value='4'>Vui chơi</option><option value='5'>Ăn</option><option value='6'>Uống</option><option value='7'>Ngắm cảnh</option> <option value='8'>Tụ họp</option><option value='9'>Tự do</option></select></br><input type='submit' class='btn btn-danger' id='saveTodatabase' name='saveTodatabase' value='Thêm vào lịch trình của bạn' onclick='pushMarker("+m+")'>");
}
function pushMarker(m){
  lats.push(infowindows[m].getPosition().lat());
  lngs.push(infowindows[m].getPosition().lng());
  startTimes.push(document.getElementById("Start-time-"+m).value);
  endTimes.push(document.getElementById("End-time-"+m).value);
  notes.push(document.getElementById("note-"+m).value);
  states.push(document.getElementById('state').value);
  myaddress.push(address[m]);
  mysubaddress.push(subaddress[m]);
  var iconstate;
  switch(document.getElementById('state').value){
    case '1': iconstate = "class='fa fa-hourglass-start' title='Điểm bắt đầu'";
      break;
    case '2': iconstate = "class='fa fa-hourglass-end' title='Điểm kết thúc'";
      break;
    case '3': iconstate = "class='fa fa-bed' title='Điểm Nghỉ ngơi'";
      break;
    case '4': iconstate = "class='fa fa-reddit-alien' title='Điểm vui chơi'";
      break;
    case '5': iconstate = "class='fa fa-cutlery' title='Ăn'";
      break;
    case '6': iconstate = "class='fa fa-coffee' title='Uống'";
      break;
    case '7': iconstate = "class='fa fa-eye' title='Ngắm cảnh'";
      break;
    case '8': iconstate = "class='fa fa-users' title='Hội họp'";
      break;
    case '9': iconstate = "class='fa fa-user-o' title='Tự do'";
      break;
  }
  var n=lats.length-1;
  $('#headListLocation').after("<li id='ListLocation-"+n+"'><a title='"+subaddress[m]+"' onclick='setCenterMyLocation("+n+")'><i class='fa fa-circle-o'></i> <span class='hidden-17'>"+subaddress[m]+"</span></a><span id='lacatTypes' class='label label-success'><i "+iconstate+"></i></span><div onclick='deleteElement("+n+")' title='Xóa vị trí này'><i class='fa fa-times fa-lg'></i></div></li>");
  setMapMyMarker(n,m);
}

function deleteElement(n){
  delete lats[n];
  delete lngs[n];
  delete startTimes[n];
  delete endTimes[n];
  delete notes[n];
  delete states[n];
  delete myaddress[n];
  delete mysubaddress[n];
  $('#ListLocation-'+n).remove();
  if(mymarkers[n].getMap()){
    mymarkers[n].setMap(null);
  }
}
function deleteMarker(n){
  markers[n].setMap(null);
}
// kết thúc tạo maker
function FindMe(){
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(selectMyPosition);
    }
}
function selectMyPosition(position){
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var myLatlng = new google.maps.LatLng(latitude,longitude);
  map.setZoom(15);
  map.setCenter({lat:latitude, lng:longitude});
  var image = "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Ball-Pink.png";
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: image,
      title:"I am Here !"
  });
}
// Hàm sort theo time
function swap(mang, i,j,){
  var k = mang[i];
  mang[i] = mang[j];
  mang[j] = k;
}
function SortTime(){
  for (var i = startTimes.length-1; i>0;i--) {
    for (var j = 0; j < i; j++) {
      if(startTimes[j] <= startTimes[i]) {
          swap(startTimes,i,j);
          swap(endTimes,i,j);
          swap(notes,i,j);
          swap(lats,i,j);
          swap(lngs,i,j);
          swap(states,i,j);
          swap(myaddress,i,j);
          swap(mysubaddress,i,j);
          var ele = $('#ListLocation-'+i).html();
          $('#ListLocation-'+i).html($('#ListLocation-'+j).html());
          $('#ListLocation-'+j).html(ele);
      }
    }
  }
  var startTimesResort = [];
  var endTimesResort = [];
  var notesResort = [];
  var latsResort = [];
  var lngsResort = [];
  var statesResort = [];
  var myaddressResort = [];
  var mysubaddressResort = [];
  for (var i = startTimes.length-1; i>=0;i--) {
    startTimesResort.push(startTimes[i]);
    endTimesResort.push(endTimes[i]);
    notesResort.push(notes[i]);
    latsResort.push(lats[i]);
    lngsResort.push(lngs[i]);
    statesResort.push(states[i]);
    myaddressResort.push(myaddress[i]);
    mysubaddressResort.push(mysubaddress[i]);
  }
  for (var i = 0; i < startTimes.length; i++) {
    startTimes[i] = startTimesResort[i];
    endTimes[i] = endTimesResort[i];
    notes[i] = notesResort[i];
    lats[i] = latsResort[i];
    lngs[i] = lngsResort[i];
    states[i] = statesResort[i];
    myaddress[i] = myaddressResort[i];
    mysubaddress[i] = mysubaddressResort[i];
  }
}
// kêt thúc hàm sort
// Thiết lập bản đồ cho tất cả markers đã chọn
function setCenterMyLocation(i){
  map.setCenter({lat: lats[i],lng: lngs[i]});
}
function setMapMyMarker(i,m) {
    markers[m].setMap(null);
    var marker = new google.maps.Marker({
      map: map,
      position: {lat: lats[i], lng: lngs[i]},
      icon: "https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/48x48/Flag1_Green.png"
    });
    mymarkers.push(marker);
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 200
    });
    var addr = myaddress[i];
    var st = startTimes[i];
    var et = endTimes[i];
    var n = notes[i];
    infowindow.setContent("<b>Địa chỉ:</b><br>"+addr+"<br><b>Thời gian bắt đầu: </b><br>"+st+"<br><b>Thời gian Kết thúc: </b><br>"+et+"<br><b>Ghi chú: </b><br>"+n+"<hr><div><button title='Ghi chú' onclick='' class='buttons'><i class='fa fa-pencil fa-lg'></i></button></div>");
    infowindow.open(map,marker);
    marker.addListener('click', function(){
      infowindow.open(map,marker);
    });
}
// Tìn thồng tin địa điểm xung quanh vị chí tìm kiếm
function getHelpOption(){
  var helpOptions = [];
  var checkbox = document.getElementsByName('helpOption');
  for (var i = 0; i < checkbox.length; i++){
    if (checkbox[i].checked === true){
      helpOptions.push(checkbox[i].value);
    }
  }
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  for (var i = 0; i < helpOptions.length; i++) {
    searchObjectnearLocaltion(helpOptions[i]);
  }
}
function searchObjectnearLocaltion(type){
    var request = {
      location: defaultLocation,
      radius: 500,
      type: [type]
    }
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(createMarkerNearbysearch);
  }
}
function createMarkerNearbysearch(place) {
  var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(25, 25)
    };
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: image
    });
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': marker.getPosition()}, function(results, status){
      address.push(results[0].formatted_address);
      subaddress.push(results[0].address_components[0].short_name+', '+results[0].address_components[1].short_name);
    });
    markers.push(marker);
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 200
    });      
    infowindows.push(infowindow);
    var m = infowindows.length-1;
    marker.addListener('click', function() {
      var request = {
          reference: place.reference
      };
      service.getDetails(request, function(details, status) {
        infowindows[m].setContent([
          "<b>"+details.name+"</b>",
          details.formatted_address,
          "<a target='_blank' href='"+details.website+"'>"+details.website+"</a>",
          "Đánh giá: <b>"+details.rating+"</b>",
          "Số điện thoại: <b>"+details.formatted_phone_number+"</b>",
          "<hr><div><button title='Xóa' onclick='deleteMarker("+m+")' class='buttons'><i class='fa fa-times fa-lg'></i></button><button title='Ghim cờ' onclick='changeDefaultLocation("+m+")' class='buttons'><i class='fa fa-flag-o fa-lg'></i></button><button title='Ghi chú' onclick='setContentForm("+m+")' class='buttons'><i class='fa fa-pencil fa-lg'></i></button></div>"].join("<br/>"));
        infowindows[m].open(map, marker);
      });
    });
  }
function changeDefaultLocation(n){
  defaultLocationIcon = 'https://cdn2.iconfinder.com/data/icons/iconslandgps/PNG/48x48/Pinpoints/NeedleWhite.png';
  defaultLocation = new google.maps.LatLng(infowindows[n].getPosition().lat(),infowindows[n].getPosition().lng());
  // for (var i = 0; i < markers.length; i++) {
  //   markers[i].setIcon('https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Bubble-Chartreuse.png');
  // }
  markers[n].setIcon(defaultLocationIcon);
}
// kết thúc tìm thông tin liên quan
// Chi đường----------------
function FindStreet(){
  for (var i = 0; i < lats.length-1; i++) {
    var x = new google.maps.LatLng(lats[i],lngs[i]);
    var y = new google.maps.LatLng(lats[i+1],lngs[i+1]); 
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    calculateAndDisplayRoute(directionsService, directionsDisplay,x,y);
    directionsDisplay.setMap(map);
  }
}
function calculateAndDisplayRoute(directionsService, directionsDisplay,x,y) {
  directionsService.route({
    origin: x,
    destination: y,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
  //get direction info
  var htmlReturn = '';
  var route = response.routes[0];
  htmlReturn += "Distance: <strong>" + route.legs[0].distance.text + "</strong>, Duration: <strong>" + route.legs[0].duration.text + "</strong>";
  document.getElementById('infoDirections').innerHTML  = htmlReturn;
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}
// -------------------------
function saveToDB(){
  var name = prompt('Tên tiến trình của bạn');
  if(name != ""){
    alert(name);
  }
  
}
// -------------------------------
$(document).ready(function(){
  $('.sortable').sortable({
    items: ':not(.disabled)'
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
});
