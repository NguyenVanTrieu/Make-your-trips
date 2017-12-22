var map;
var infowindows = [];
var markers = [];
var myMarkers = [];
var times = [];
var notes = [];
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
      draggable: true,
      position: {lat: 20.996004, lng: 105.808000},
      icon: flag
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
    geocoder.geocode( { 'location': place}, function(results, status) {
      infowindows[m].setContent(results[0].formatted_address+"<hr><div><button title='Xóa' onclick='deleteMarker("+m+")' class='buttons'><i class='fa fa-times fa-lg'></i></button><button title='Ghim cờ' onclick='changeDefaultLocation("+m+")' class='buttons'><i class='fa fa-flag-o fa-lg'></i></button><button title='Ghi chú' onclick='setContentForm("+m+")' class='buttons'><i class='fa fa-pencil fa-lg'></i></button></div>");
      infowindows[m].open(map, marker);
    });
  });
}
function setContentForm(m){ 
  infowindows[m].setContent("<label>Giờ bắt đầu</label><input class='form-control' id='time-"+m+"' type='time' name='time' required='required'><br><label>Ghi chú</label><input class='form-control' id='note-"+m+"' type='text' name='txt' required='required'></br><input type='button' class='btn' id='saveTodatabase' name='saveTodatabase' value='Thêm vào lịch trình của bạn' onclick='pushMarker("+m+")'>");
}
function pushMarker(m){
  myMarkers.push(markers[m]);
  times.push(document.getElementById("time-"+m).value);
  notes.push(document.getElementById("note-"+m).value);
  var n=myMarkers.length-1;
  $('#headListLocation').after("<li id='ListLocation-"+n+"'><a href='#''><i class='fa fa-circle-o'></i> "+document.getElementById('time-'+m).value+"</a><div onclick='deleteElement("+n+")' title='Xóa vị trí này'><i class='fa fa-times fa-lg'></i></div></li>");
}
function deleteElement(n){
  delete myMarkers[n];
  delete times[n];
  delete notes[n];
  $('#ListLocation-'+n).remove();
  markers[n].setMap(null);
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
  for (var i = times.length-1; i>0;i--) {
    for (var j = 0; j < i; j++) {
      if(times[j] <= times[i]) {
          swap(times,i,j);
          swap(notes,i,j);
          swap(myMarkers,i,j);
          var ele = $('#ListLocation-'+i).html();
          $('#ListLocation-'+i).html($('#ListLocation-'+j).html());
          $('#ListLocation-'+j).html(ele);
      }
    }
  }
  var timesResort = [];
  var notesResort = [];
  var myMarkerResort = [];
  for (var i = times.length-1; i>=0;i--) {
    timesResort.push(times[i]);
    notesResort.push(notes[i]);
    myMarkerResort.push(myMarkers[i]);
  }
  for (var i = 0; i < times.length; i++) {
    times[i] = timesResort[i];
    notes[i] = notesResort[i];
    myMarkers[i] = myMarkerResort[i];
  }
}
// kêt thúc hàm sort
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
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: image
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
        infowindow.setContent([
          "<b>"+details.name+"</b>",
          details.formatted_address,
          "<a target='_blank' href='"+details.website+"'>"+details.website+"</a>",
          "Đánh giá: <b>"+details.rating+"</b>",
          "Số điện thoại: <b>"+details.formatted_phone_number+"</b>",
          "<hr><div><button title='Xóa' onclick='deleteMarker("+m+")' class='buttons'><i class='fa fa-times fa-lg'></i></button><button title='Ghim cờ' onclick='changeDefaultLocation("+m+")' class='buttons'><i class='fa fa-flag-o fa-lg'></i></button><button title='Ghi chú' onclick='setContentForm("+m+")' class='buttons'><i class='fa fa-pencil fa-lg'></i></button></div>"].join("<br/>"));
        infowindow.open(map, marker);
      });
    });
  }
function changeDefaultLocation(n){
  defaultLocation = new google.maps.LatLng(infowindows[n].getPosition().lat(),infowindows[n].getPosition().lng());
  markers[n].setIcon('https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/48x48/Flag1_Green.png');
}
// kết thúc tìm thông tin liên quan
$('.sortable').sortable({
  items: ':not(.disabled)'
});