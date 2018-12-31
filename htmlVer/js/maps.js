$(document).ready(function () {
    /*init map*/
    gMap();
    /*centerize map*/
    setTimeout(function () {
        add_markers(objectMarkers);
        map.setCenter(center);
    }, 500);

    /**
     * default options of map and cluster
     */
    var markerIcon = '../img/marker.png';

    var clusterOptions = {
        imagePath: markerIcon,
        styles: [{
            url: markerIcon,
            height: 69,
            width: 66,
            anchor: [0, 0],
            zoomOnClick: true,
            backgroundPosition: 'top',
            textColor: '#2d3d50',
            textSize: 16
        }]
    };

    var markersArray = {};
    var markerCluster = {};

    /**
     * default parameters for map
     */
    var lat = objectMapCenter.lat,
        lng = objectMapCenter.lng,
        center = new google.maps.LatLng(lat, lng);

    /**
     * call info Window globally
     * @type {google.maps.InfoWindow}
     */
    var infowindow = new google.maps.InfoWindow();

    /**
     * call map globally
     */
    var map;

    function gMap() {
        var wrapper = document.querySelector('.map');

        // wrapper.style.height = 'calc(100vh - '+ $('header').outerHeight() +'px)';
        map = new google.maps.Map(wrapper, {
            zoom: 13,
            center: center,
            icon: markerIcon,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            navigationControl: true,
            mapTypeControl: true,
            streetViewControl: false,
            scrollwheel: true,
            fullscreenControl: true
        });
        google.maps.event.addDomListener(window, 'resize', function() {
        	if (!TEST_MAC) {
                map.setCenter(center);
            }
        });

        google.maps.event.addListener(map, 'click', function (evt) {
            if (evt.pixel != 'undefined') {
                infowindow.close();
            }
        });
    }

// if ($('.map').length>=1) {
// 	console.log($('.map').length>=1)
//     setTimeout(function () {
//         $('.map').animate({
//             'height': 'calc(100vh - ' +$('header').outerHeight()+ 'px)'
//         }, 500, function(e) {
//             // map.setCenter(new google.maps.LatLng(48.23800899780855, 31.220982500000036));
//             is_mapInit = true;
//         });
//         gMap();
//     }, 500)
// }
    /**
     * макет окна с информацией про магазины
     */
    function buildTemplate(object) {
        return "<div class='store_info'>" +
            "<span class='store_address'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 477 477\"><use href=\"#placeholder\" ></use></svg>" + object.addressStore + "</span>" +
            "<span class='store_time'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 41.301 41.301\"><use href=\"#clock\" ></use></svg>" + object.workTime + "</span>" +
            "<span class='store_phone'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 473.806 473.806\"><use href=\"#phoneCall\" ></use></svg>" + object.phones + "</span>" +
            "</div>"
    }

    /**
     * Наносит маркера на карту
     */
    function add_markers(object) {
        var markers;
        if (markerCluster.clusters_) {
            markerCluster.clearMarkers();
            map.setZoom(15);
            map.setCenter(center);
            infowindow.close();
        }
        map.setCenter(center);
        markerCluster = new MarkerClusterer(map, markers, clusterOptions);

        markers = object.map(function (object, i) {
            var message = buildTemplate(object);

            var marker = new google.maps.Marker({
                position: {lat: object.lat, lng: object.lng},
                map: map,
                icon: markerIcon,
                markerContent: {
                    addressStore: object.addressStore,
                    workTime: object.workTime,
                    phones: object.phones
                }
            });
            markersArray[i] = marker;
            marker.setMap(map);
            google.maps.event.addListener(marker, 'click', function (evt) {
                infowindow.setContent(message);
                infowindow.open(map, marker);
                map.setCenter(new google.maps.LatLng(object.lat, object.lng));
                map.setZoom(15);
                // marker.setIcon('../img/markerActive.png');
                return false;
            });
            return marker;
        });
        markerCluster = new MarkerClusterer(map, markers, clusterOptions);
    }

    function openMarkerInfo(id) {
        infowindow.close();
        var marker = markersArray[id];
        var message = buildTemplate(marker.markerContent);
        scrollToElem($('.shop_main'), $('header').outerHeight() + 50);
        scrollToElem($('.shop_inner.with_map'), $('header').outerHeight() + 50);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
        infowindow = new google.maps.InfoWindow({
            content: message
        });

        infowindow.open(marker.get('map'), marker);
    }

    $('[data-point-id]').click(function () {
        openMarkerInfo($(this).attr('data-point-id'));
    });

});


