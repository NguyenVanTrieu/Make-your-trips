var map;
var lats = [];
var longs = [];
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
var infowindow;
function createMarker(place) {
  var marker = new google.maps.Marker({
      map: map,
      position: place,
      animation: google.maps.Animation.DROP,
  });
  infowindow = new google.maps.InfoWindow();
  var geocoder = new google.maps.Geocoder();
  marker.addListener('click', function() {
    geocoder.geocode( { 'location': place}, function(results, status) {
      infowindow.setContent(results[0].formatted_address+"<br><button onclick='setContentForm()' class='btn-defaule'><i class='fa fa-pencil fa-lg'></i></button>");
      infowindow.open(map, marker);
    });
  });
}
function setContentForm(){
  infowindow.setContent("<form method='post'><label>Giờ bắt đầu</label><input class='form-control' id='time' type='time' name='time' required='required'><br><label>Ghi chú</label><input class='form-control' id='note' type='text' name='txt' required='required'></br><input type='button' class='btn' id='saveTodatabase' name='saveTodatabase' value='Thêm vào lịch trình của bạn' onclick='pushMarker()'></form>");
}
function pushMarker(){
  lats.push(infowindow.getPosition().lat());
  longs.push(infowindow.getPosition().lng());
  times.push(document.getElementById('time').value);
  notes.push(document.getElementById('note').value);
  $('#headListLocation').after("<li><a href='#''><i class='fa fa-circle-o'></i> "+document.getElementById('time').value+"</a><div title='Xóa vị trí này'><i class='fa fa-times fa-lg'></i></div></li>");
}
// kết thúc tạo maker
$('.sortable').sortable({
  items: ':not(.disabled)'
});