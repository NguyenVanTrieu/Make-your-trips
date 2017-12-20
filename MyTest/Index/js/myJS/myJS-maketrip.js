var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 20.996004, lng: 105.808000},
      zoom: 15
    });
}
// kết thúc tự động điền mà tìm kiếm
$('.sortable').sortable({
  items: ':not(.disabled)'
});