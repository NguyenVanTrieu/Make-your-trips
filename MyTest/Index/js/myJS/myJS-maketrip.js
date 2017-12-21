var map;
var infowindows = [];
var markers = [];
var myMarkers = [];
var times = [];
var notes = [];
var flag = 'https://cdn0.iconfinder.com/data/icons/fatcow/32/flag_finish.png';
function initMap() {
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
  var marker = new google.maps.Marker({
      map: map,
      position: place,
      animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
  var infowindow = new google.maps.InfoWindow();
  infowindows.push(infowindow);
  var m = infowindows.length-1;
  var geocoder = new google.maps.Geocoder();
  marker.addListener('click', function() {
    geocoder.geocode( { 'location': place}, function(results, status) {
      infowindows[m].setContent(results[0].formatted_address+"<br><button onclick='setContentForm("+m+")' class='btn-defaule'><i class='fa fa-pencil fa-lg'></i></button>");
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
  myMarkers.splice(n,1);
  times.splice(n,1);
  notes.splice(n,1);
  $('#ListLocation-'+n).remove();
  markers[n].setMap(null);
}
// kết thúc tạo maker
$('.sortable').sortable({
  items: ':not(.disabled)'
});