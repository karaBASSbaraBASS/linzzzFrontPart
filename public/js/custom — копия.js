var TEST_IE;
var TEST_MAC;
var onlineTrigger = true;

$(document).ready(function() {
    if ( $(".map").length > 1) {
        gMap();
    };

    /* ie stub */
    var $TEST_IE = detectIE(),
        $intIeVersion = parseInt( $TEST_IE );

    if ($TEST_IE) {

        if ($intIeVersion <= 10) {
            $(".internet_block").css({"display": "block"});
            $(".main").css({"display": "none"});

        } else {
        }
    }
    /* ie stub end */

    // document.form.onsubmit = validateSubscribeForm;

    var $hashTrigger = window.location.hash.substring(1)
    if ( $hashTrigger === "online" ) {
        onlineTrigger = false;
    } else if( $hashTrigger === "offline" ) {
        onlineTrigger = true;
    } else {
        //do nothing
    }

    $(".play-button").on('click', function(e) {
        PopUpShow();
    });
    $(".b-popup__close").on('click', function(e) {
        PopUpHide();
    });

});

$(window).on('load', function() {
    // hide city select if they are < 2
    if( $(".custom_select.disabled_default option") >= 2 ) {
        $("#city2-button").css({"display":"none"});
    }

    // show white stub before site will be loaded
    setTimeout(function(){
        $(".whiteShield").css({"display": "none"})
    }, 300);

    var objectRest = [
        {
            lat: 50.442268,
            lng: 30.522754,
            addressStore: 'вул. Басейна, 1/2а',
            phones: '+38093 000 - 00 - 12'
        },
        {
            lat: 50.450984,
            lng: 30.522753,
            addressStore: 'ТЦ &quot;Глобус&quot;, 1 лінія, вул. Майдан Незалежності, 1',
            phones: '+38093 000 - 00 - 12'
        },
        {
            lat: 50.447820,
            lng: 30.523719,
            addressStore: 'вул. Хрещатик 15/4',
            phones: '+38093 000 - 00 - 12'
        },
        {
            lat: 50.397489,
            lng: 30.637740,
            addressStore: 'ТЦ &quot;Піраміда&quot;, 2 поверх, вул. Мішуги, 4а',
            phones: '+38093 000 - 00 - 12'
        },
        {
            lat: 50.455738,
            lng: 30.445811,
            addressStore: 'ТЦ &quot;Точка&quot;, вул. Довженка, 1-В',
            phones: '+38093 000 - 00 - 12'
        },
        {
            lat: 50.437495,
            lng: 30.515721,
            addressStore: 'Велика Васильківська, 40',
            phones: '+38093 000 - 00 - 12'
        },
        {
            lat: 50.461996,
            lng: 30.481542,
            addressStore: 'ТЦ &quot;Квадрат&quot;, вул. Білоруська 2а',
            phones: '+38093 000 - 00 - 12'
        },
        {
            lat: 50.462865,
            lng: 30.519424,
            addressStore: 'площа Контрактова, 2/1',
            phones: '+38093 000 - 00 - 12'
        }
    ];

    // if($(".half_map div").length > 1) {
    //
    //     mapCenter();
    //
    //     function mapCenter(e) {
    //         map.setCenter(new google.maps.LatLng(48.23800899780855, 31.220982500000036));
    //         is_mapInit = true;
    //     };
    //
    //     setTimeout(function() {
    //         add_markers(objectRest);
    //         map.setCenter(center);
    //     }, 500);
    // };

    $('.wrap_selector').each(function() {
        var that = $(this);
        $(this).find('.custom_select').selectmenu({
            appendTo: that,
            create: function(event, ui) {
                if ($('.shop_main').length) {
                    setTimeout(function() {
                        event.target.selectedIndex = 0;
                        $('.ui-selectmenu-text').text(event.target[0].outerText);
                    }, 50);
                }
            },
            change: function(event, ui) {

                $(event.currentTarget).siblings().removeClass('activeItem');
                $(event.currentTarget).addClass('activeItem');
                var selectedResultId = ui.item.value;
                var ajaxPermission = $(this).data('ajax');

                if (ajaxPermission) {
                    var ajaxUrl = $(this).data('url');

                    $.ajax({
                        type: 'GET',
                        url: ajaxUrl,
                        data: { selectedResultId: selectedResultId },
                        success: function(data) {

                            $('#ajax_render').html('');
                            $('#ajax_render').html(data.resultData);
                            if (data.accordion) {
                                vacancyAccordion();
                                $('.vacancy_wrapper .filter_tags a').eq(0).addClass('active').siblings().removeClass('active');
                                $('.empty_career').hide();
                            }
                        }

                    });
                } else {

                    if (that.parents('form').hasClass('chosen_shop')) {
                        location.assign(ui.item.value)
                    }
                }
            }
        })
        // })._renderItem = function(event, ui) {
        //     console.log()
        // }
    });

    $(".contactUsBTN").on('click', function() {
        $(".contactForm").toggleClass("active");

        if ( $(".contactForm").hasClass("active") ) {
            var offset = -72;
            setTimeout(function(){
                $('html, body').animate({
                    scrollTop: $(".contactForm").offset().top + offset
                }, 500);
                // console.log("timeout")
            }, 500);
            
        } else {}
    });
    $(".closeBtn").on('click', function() {
        $(".contactForm").removeClass("active");
        $(".sucsessModal").removeClass("active");
    });

    $(".submitBtn").submit(function(event) {
        alert("Handler for .submit() called.");
        event.preventDefault();
        validate();
    });

    //hamburger



    
    
});


function productSlider() {
    $('.productContent__item .contentSlider').slick({
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
        nextArrow: '<div class="slick-next"></div>',
        prevArrow: '<div class="slick-prev"></div>',
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: '<div class="slick-nextSmall dark"></div>',
                    prevArrow: '<div class="slick-prevSmall dark"></div>'
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: '<div class="slick-nextSmall dark"></div>',
                    prevArrow: '<div class="slick-prevSmall dark"></div>'
                }
            }
        ]
    });
}

function validateSubscribeForm(form) {
    form.preventDefault();
    // console.log(form);

    var inputName = form.target.name;
    var inputEmail = form.target.email;
    var inputComment = form.target.comment;

    // console.log(email);

    checkEmail(inputEmail);
    checkName(inputName);
    checkComment(inputComment);

    if ($(".contactForm").find(".error").length > 0) {
        // console.log("form has errors");
    } else {
        var data = $(form).serialize();
        var dataUrl = $(form).attr('data-url');

        // console.log("still validating");

        $.ajax({
            type: "POST",
            url: 'send_mail.php',
            data: data,
            success: function(data) {
                // console.log(data);
                showSucsessMsg();
            },
            error: function(data) {
                setTimeout(mailCallback, 2000);
            }
        });

        // console.log("no errors");
        showSucsessMsg();
    };
}
// send action end
// validation
function checkEmail(field) {
    // console.log("email check");
    var patternEmail = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e][a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,10}$/;
    var testEmail = patternEmail.test(field.value);
    if (!testEmail || field.value == '') {
        // $(this).getIncorrectMessage(field);
        // isAllow = false;
        if (!$('#email').hasClass("error")) {
            $('#email').addClass("error");
        }
        // console.log(field.value);
    } else {

        if ($('#email').hasClass("error")) {
            $('#email').removeClass("error");
        }
    }
}

function checkName(field) {
    // console.log("name check");
    var patternText = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e\d]{3,}$/;
    var testCharacters = patternText.test(field.value);
    if (!testCharacters || field.value > 3) {
        // $(this).getIncorrectMessage(field);
        // isAllow = false;
        if (!$('#name').hasClass("error")) {
            $('#name').addClass("error");
        }
    } else {
        if ($('#name').hasClass("error")) {
            $('#name').removeClass("error");
        }
    }
}

function checkComment(field) {
    // console.log("name check");
    var patternText = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e\d]{5,}$/;
    var testCharacters = patternText.test(field.value);
    if (!testCharacters || field.value > 3) {
        // $(this).getIncorrectMessage(field);
        // isAllow = false;
        if (!$('#comment').hasClass("error")) {
            $('#comment').addClass("error");
        }
    } else {
        if ($('#comment').hasClass("error")) {
            $('#comment').removeClass("error");
        }
    }
}

function showSucsessMsg() {
    $('.contactForm').removeClass('active');
    $('.sucsessModal').addClass('active');
    callShowTime();
}

function callShowTime() {
    function showMsg() {
        $('.sucsessModal').removeClass('active');
    }
    setTimeout(showMsg, 3000);
}
function PopUpShow(){
    $("#popup1").show();
}
//Функция скрытия PopUp
function PopUpHide(){
    $("#popup1").hide();
}
function menuHeightWidthBig() {

    var $winWidth = window.innerWidth,
        $colWidth = $winWidth/4,
        $menuItemsCount = $(".mainPruductMenu .mainMenu__item").length,
        $headerHeight = $(".headerWrap").height(),
        $winHeight = window.innerHeight - $headerHeight,
        $btnHeight = $winHeight/$menuItemsCount;

    if ($(".mainPruductMenu .mainMenu__part").length > 0) {
        // console.log( "azaza" );
        $(".mainPruductMenu .mainMenu__part").css({ width: $colWidth});
        $(".mainPruductMenu .mainMenu__item").css({ height: $btnHeight});
    }
}
function menuHeightWidthSmall() {

    var $winWidth = window.innerWidth,
        $colWidth = $winWidth,
        $mainMenuItemsCount = $(".mobileNavigation .mainMenu__item").length,
        $prodMenuItemsCount = $(".mainPruductMenu .mainMenu__item").length,
        $headerHeight = $(".headerCover").height(),
        $winHeight = window.innerHeight - $headerHeight,
        $btnHeightMain = $winHeight/$mainMenuItemsCount;
        $btnHeightProd = $winHeight/$prodMenuItemsCount;

        if ($(".mainMenu__part").length > 0) {
            // console.log( "azaza" );
            $(".mainMenu__part").css({ width: $colWidth});
            $(".mobileNavigation .mainMenu__item").css({ height: $btnHeightProd});
            $(".mainPruductMenu .mainMenu__item").css({ height: $btnHeightProd});
        }
}
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');


    var msie11 = ua.indexOf('rv:11');
    if (msie11 > 0) {
        // IE 10 or older => return version number
        return parseInt( ua.substring(msie11+3, ua.indexOf('.', msie11)+2), 10 );
    }

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {// IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {// Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }// other browser
    return false;
}
function heightses($cathedItem) {
    $cathedItem.height('auto').equalHeights();
    console.log("azaza");
}

// /*-----------------map--------------------*/
//
// /**
//  * default options of map and cluster
//  */
// var markerIcon = '/img/checkpoint.png';
// var mapOptions = [
//     {
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#f5f5f5"
//             }
//         ]
//     },
//     {
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#616161"
//             }
//         ]
//     },
//     {
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "color": "#f5f5f5"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.land_parcel",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#bdbdbd"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#eeeeee"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#757575"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.business",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#e5e5e5"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#9e9e9e"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#757575"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#dadada"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#616161"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#9e9e9e"
//             }
//         ]
//     },
//     {
//         "featureType": "transit.line",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#e5e5e5"
//             }
//         ]
//     },
//     {
//         "featureType": "transit.station",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#eeeeee"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#c9c9c9"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#9e9e9e"
//             }
//         ]
//     }
// ];
// var clusterOptions = {
//     imagePath: markerIcon,
//     styles: [{
//         url:markerIcon,
//         height: 60,
//         width: 44,
//         anchor: [0, 0],
//         zoomOnClick: true,
//         backgroundPosition: 'top',
//         textColor: '#2d3d50',
//         textSize: 16
//     }]
// };
// var markersArray = {};
// var markerCluster ={};
// /**
//  * default parameters for map
//  */
// var lat = 50.45466,
//     lng = 30.5238,
//     center = new google.maps.LatLng(lat, lng);
// /**
//  * call info Window globally
//  * @type {google.maps.InfoWindow}
//  */
// var infowindow   = new google.maps.InfoWindow();
// /**
//  * call map globally
//  */
// var map;

// function gMap() {
//     var wrapper = document.querySelector('.half_map');
//
//     // wrapper.style.height = 'calc(100vh - '+ $('header').outerHeight() +'px)';
//     map = new google.maps.Map(document.querySelector('.half_map'), {
//         zoom: 11,
//         center: center,
//         icon: markerIcon,
//         styles: mapOptions,
//         navigationControlOptions: {
//             style: google.maps.NavigationControlStyle.ZOOM_PAN
//         },
//         mapTypeControlOptions: {
//             style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
//             position: google.maps.ControlPosition.TOP_RIGHT,
//             mapTypeIds: ['terrain', 'roadmap', 'hybrid']
//         },
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         disableDefaultUI: true,
//         navigationControl: true,
//         mapTypeControl: true,
//         streetViewControl: false,
//         scrollwheel: true,
//         fullscreenControl: true
//     });
//     // google.maps.event.addDomListener(window, 'resize', function() {
//     // 	if (!TEST_MAC) {
//     //         map.setCenter(center);
//     //     }
//     // });
//
//     google.maps.event.addListener(map, 'click', function(evt) {
//         if (evt.pixel != 'undefined') {
//             infowindow.close();
//         }
//     });
// }
// if ($('.half_map').is(':visible')) {
//     setTimeout(function () {
//         $('.half_map').animate({
//             'height': 'calc(100vh - ' +$('header').outerHeight()+ 'px)'
//         }, 500, function(e) {
//             // map.setCenter(new google.maps.LatLng(48.23800899780855, 31.220982500000036));
//             is_mapInit = true;
//         });
//         gMap();
//     }, 500)
// }
// function buildTemplate(object) {
//     var secondTime = '';
//     if (typeof object.workTime2 !== 'undefined'){
//         secondTime = "<span class='shop_time'>" + object.workTime2 + "</span>";
//     }
//     return  "<div class='open_store_info'>" +
//         "<span class='shop_address'>"+object.addressStore+"</span>" +
//         "<span class='shop_time'>" + object.workTime + "</span>" +
//         secondTime +
//         "</div>"
// }
//
// /**
//  * Наносит маркер ресторана на карту
//  */
// function add_markers( object ) {
//     var markers;
//     if (markerCluster.clusters_) {
//         markerCluster.clearMarkers();
//         map.setZoom(6);
//         map.setCenter(center);
//         infowindow.close();
//     }
//     map.setCenter(center);
//     markerCluster = new MarkerClusterer(map, markers, clusterOptions);
//
//
//     markers = object.map(function(object, i) {
//         var message = buildTemplate(object);
//
//         var marker = new google.maps.Marker({
//             position: {lat : object.lat, lng:object.lng},
//             map: map,
//             icon: markerIcon,
//             markerContent : {
//                 addressStore: object.addressStore,
//                 workTime: object.workTime,
//                 workTime2: object.workTime2,
//                 phones: object.phones
//             }
//         });
//         markersArray[i] = marker;
//         marker.setMap(map);
//         google.maps.event.addListener(marker, 'click', function(evt) {
//             infowindow.setContent(message);
//             infowindow.open(map, marker);
//             map.setCenter(new google.maps.LatLng(object.lat, object.lng));
//             map.setZoom(15);
//             return false;
//         });
//         return marker;
//     });
//     markerCluster = new MarkerClusterer(map, markers, clusterOptions);
// }
//
// function openMarkerInfo(id){
//     infowindow.close();
//     var marker = markersArray[id];
//     var message = buildTemplate(marker.markerContent);
//     scrollToElem($('.shop_main'), $('header').outerHeight()+50);
//     scrollToElem($('.shop_inner.with_map'), $('header').outerHeight()+50);
//     map.setZoom(15);
//     map.setCenter( marker.getPosition() );
//     infowindow = new google.maps.InfoWindow({
//         content: message
//     });
//
//     infowindow.open(marker.get('map'), marker);
// }
//
// $('[data-point-id]').click(function () {
//     openMarkerInfo($(this).attr('data-point-id'));
// });