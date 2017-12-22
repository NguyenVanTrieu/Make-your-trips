var map;
var infowindows = [];
var markers = [];
var lats = [];
var lngs = [];
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
      position: {lat: 20.996004, lng: 105.808000},
      icon: flag
    });
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
  lats.push(infowindows[m].getPosition().lat());
  lngs.push(infowindows[m].getPosition().lng());
  times.push(document.getElementById("time-"+m).value);
  notes.push(document.getElementById("note-"+m).value);
  var n=lats.length-1;
  $('#headListLocation').after("<li id='ListLocation-"+n+"'><a onclick='setMapMyMarker("+n+")' href='#''><i class='fa fa-circle-o'></i> "+document.getElementById('time-'+m).value+"</a><div onclick='deleteElement("+n+")' title='Xóa vị trí này'><i class='fa fa-times fa-lg'></i></div></li>");
}
function deleteElement(n){
  delete lats[n];
  delete lngs[n];
  delete times[n];
  delete notes[n];
  alert(times.length);
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
          swap(lats,i,j);
          swap(lngs,i,j);
          var ele = $('#ListLocation-'+i).html();
          $('#ListLocation-'+i).html($('#ListLocation-'+j).html());
          $('#ListLocation-'+j).html(ele);
      }
    }
  }
  var timesResort = [];
  var notesResort = [];
  var latsResort = [];
  var lngsResort = [];
  for (var i = times.length-1; i>=0;i--) {
    timesResort.push(times[i]);
    notesResort.push(notes[i]);
    latsResort.push(lats[i]);
    lngsResort.push(lngs[i]);
  }
  for (var i = 0; i < times.length; i++) {
    times[i] = timesResort[i];
    notes[i] = notesResort[i];
    lats[i] = latsResort[i];
    lngs[i] = lngsResort[i];
  }
}
// kêt thúc hàm sort
// Thiết lập bản đồ cho tất cả markers đã chọn
function setMapMyMarker(i) {
    //markers[i].setMap(null);
    var marker = new google.maps.Marker({
      map: map,
      position: {lat: lats[i], lng: lngs[i]},
      icon: "https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/48x48/Flag1_Green.png"
    });
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 200
    });
    var t = times[i];
    var n = notes[i];
    infowindow.setContent("<b>Thời gian bắt đầu: </b>"+t+"<br> <b>Ghi chú: </b>"+n+"<hr><div><button title='Ghi chú' onclick='' class='buttons'><i class='fa fa-pencil fa-lg'></i></button></div>");
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
    markers.push(marker);

    var infowindow = new google.maps.InfoWindow({
      maxWidth: 200
    });
    infowindows.push(infowindow);
    alert(infowindows.length);
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
function saveToDB(){
  var name = prompt('Tên tiến trình của bạn');
  if(name != ""){
    alert(name);
  }
  
}
// -------------------------------
$('.sortable').sortable({
  items: ':not(.disabled)'
});