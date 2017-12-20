var map;
var flag = {
          url: 'https://cdn0.iconfinder.com/data/icons/fatcow/32/flag_finish.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
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
  infowindow.setContent("<form method='post'><label>Tiêu đề</label><input class='form-control' type='text' name='title'><br><label>Giờ bắt đầu</label><input class='form-control' type='time' name='time'><br><label>Ghi chú</label><input class='form-control' type='text' name='txt'></br><input type='button' class='btn' id='saveTodatabase' name='saveTodatabase' value='Thêm vào lịch trình của bạn' onclick='sendData()'></form>");
}
// kết thúc tạo maker
$('.sortable').sortable({
  items: ':not(.disabled)'
});