var TEST_IE,
    TEST_MAC,
    onlineTrigger = true,
    is_mapInit = false;

$(document).ready(function () {

    /* ie stub */
    var $TEST_IE = detectIE(),
        $intIeVersion = parseInt($TEST_IE);

    if ($TEST_IE) {

        if ($intIeVersion <= 10) {
            $(".internet_block").css({"display": "block"});
            $(".main").css({"display": "none"});

        } else {
        }
    }
    /* ie stub end */

    partnersSlider();

    $(".b-popup__close").on('click', function (e) {
        PopUpHide();
    });

    $(".menu__showContent").on('click', function (e) {
        var activeCaption = $(this).find(".menu__buttonCaption--show"),
            pasiveCaption = $(this).find(".menu__buttonCaption--hide"),
            curItemBlock = $(this).closest(".menu__item .menu__itemBlock"),
            blockHeight = $(this).closest(".menu__item").height(),
            itemHeight = $(this).closest(".menu__itemBlock").find(".menu__itemCaption");
            //.menu__itemCaption

        curItemBlock.toggleClass("menu__itemBlock--active")
        if ( activeCaption.hasClass("active")) {
            activeCaption.removeClass("active")
            pasiveCaption.addClass("active")
            itemHeight.height(blockHeight)
            console.log("active")
            console.log(itemHeight)
            console.log(blockHeight)
        } else {
            pasiveCaption.removeClass("active")
            activeCaption.addClass("active")
        }

    });
    // setSquareHeight
    if (! window.innerWidth >= 758 ){
        setSquareHeight();
    }

    /* create floating arrow */
    $('#content').append('<div class="floatingArrow"></div>');
    $(".floatingArrow").on( "click", function() {
        $('body, html').animate({scrollTop: 0}, 500);
        if ( $(".year-list.active").length >= 1) {
            $(".year-list").removeClass("active");
        }
        if ( $(".kabinet-menu ul.active").length >= 1) {
            $(".kabinet-menu ul.active").removeClass("active");
            categoryHide();
        }
    });
    $(window).scroll(function () { // scroll event
        // draw arrow - back to top
        drawFloatingArrow();
    });
    /* create floating arrow end */

});

$(window).on('load', function () {


    var $hamburger = $(".hamburger"),
        $nav = $(".navigation"),
        $curHeight = window.innerHeight,
        $menuHeight = $curHeight - $("header").innerHeight();

    //hamburger
    $hamburger.on('click', function () {
        // convert menu
        if ($(this).hasClass("convert")) {
            $(this).removeClass("convert");
        } else {
            $(this).addClass("convert");
        }
        // open menu
        if ($hamburger.hasClass("convert")) {
            $nav.addClass("active");
        } else {
            $nav.removeClass("active");
        }
        // fix body
        fixedBody($nav);
        // resize header on open menu
        if ($(this).hasClass("convert")) {
            $("header").addClass("header__scrolled");
        } else {
            $("header").removeClass("header__scrolled");
        }

    });

    if (window.innerWidth <= 1024) {
        setNavHeight()
    }

    // setSliderHeight();
    setSlickHeight();

    // show white stub before site will be loaded
    setTimeout(function () {
        $(".whiteShield").css({"display": "none"})
    }, 300);


    $(window).resize(function() {

        // set square height
        if (! window.innerWidth >= 758 ){
            setSquareHeight();
        }
        // set menu on resize
        setNavHeight()

        // setSliderHeight();
        setSlickHeight();
    })
    $(window).on('scroll', function(){
        if( window.innerWidth > 768 ) {
            var $header = $("header");
            var $headerHeight = $header.height();

                if ($header.hasClass('header__scrolled') && window.pageYOffset < $headerHeight ) {
                    $header.removeClass('header__scrolled');
                } else if (window.pageYOffset > $headerHeight) {
                        $header.addClass('header__scrolled');
                }

                //$header.removeClass('header__scrolled')
            }


    });
    // activeNAV -> fixed screen size
    // alert(window.innerWidth);

});
function setSlickHeight() {
    var stHeight = $('.slick-track').height();
    $('.slick-slide').css('height',stHeight + 'px' );
}
function fixedBody($nav) {
    if ($nav.hasClass("active")) {
        $("body").addClass("fixedBody");
    } else {
        $("body").removeClass("fixedBody");
    }
}
function setNavHeight() {
    var $nav = $(".navigation"),
        $navHeight =  $("header").innerHeight(),
        $curHeight = window.innerHeight,
        $menuHeight = $curHeight - 80;
    if (window.innerWidth <= 1024){
        $nav.css({height: $menuHeight + "px", top: "-" + $menuHeight + "px"})
    }
    //console.log($navHeight);
}

function partnersSlider() {
    $('.sliderBlock').slick({
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        nextArrow: '<div class="slick-next"></div>',
        prevArrow: '<div class="slick-prev"></div>'

    });
}

function validateSubscribeForm(form) {

    var inputName = form.name.value;
    var inputPhone = form.phone.value;
    var inputEmail = form.email.value;
    var inputComment = form.textMessage.value;

    // console.log(email);

    checkName(inputName);
    checkEmail(inputEmail);
    checkComment(inputComment);
    checkPhone(inputPhone);

    if ($(".contactForm").find(".error").length > 0) {
         console.log("form has errors");
    } else {
        var data = $(form).serialize();
        var dataUrl = $(form).attr('data-url');

        // console.log("still validating");

        $.ajax({
            type: "POST",
            url: 'send_mail.php',
            data: data,
            success: function (data) {
                // console.log(data);
                showSucsessMsg();
            },
            error: function (data) {
                setTimeout(mailCallback(), 2000);
            }
        });

        // console.log("no errors");
        showSucsessMsg();
    }
    ;
}

// send action end
// show popup
function mailCallback() {
    setTimeout(function(){
        $(".popup").removeClass("active")
    }, 3000);
    $(".popup").addClass("active")
    $('.contactForm').val('');
}
// validation
function checkEmail(field) {
    var patternEmail = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e][a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,10}$/;
    var testEmail = patternEmail.test(field);
    if (!testEmail) {
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
    var patternText = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e\d]{3,20}$/;
    var testCharacters = patternText.test(field);
    if (!testCharacters) {
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
     //console.log("comment check");
    var patternText = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e\d]{5,}$/;
    var testCharacters = patternText.test(field);
    if (!testCharacters) {
        if (!$('#textMessage').hasClass("error")) {
            $('#textMessage').addClass("error");
        }
    } else {
        if ($('#textMessage').hasClass("error")) {
            $('#textMessage').removeClass("error");
        }
    }
}
function checkPhone(field) {
    //console.log("phone check");
    var patternText = /^([+]?[0-9\s-\(\)]{3,25})*$/;
    var testCharacters = patternText.test(field);
    if (!testCharacters) {
        // $(this).getIncorrectMessage(field);
        // isAllow = false;
        if (!$('#phone').hasClass("error")) {
            $('#phone').addClass("error");
            console.log(testCharacters + " = error");
        }
    } else {
        if ($('#phone').hasClass("error")) {
            $('#phone').removeClass("error");
            console.log(field + " ok");
        }
    }
}

function showSucsessMsg() {
    $('.sucsessModal').addClass('active');
    callShowTime();
}

function callShowTime() {
    function showMsg() {
        $('.sucsessModal').removeClass('active');
    }

    setTimeout(showMsg, 3000);
}

function PopUpShow() {
    $("#popup1").show();
}

//Функция скрытия PopUp
function PopUpHide() {
    $("#popup1").hide();
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
        return parseInt(ua.substring(msie11 + 3, ua.indexOf('.', msie11) + 2), 10);
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
// height partners Block
function setSquareHeight() {
    var squareWidth = $(".textSquare:first-child").width();
    $(".textSquare").height(squareWidth);
}
// draw arrow - back to top
function drawFloatingArrow() {
    /* slide page on top */

    if ( $(".floatingArrow").length ) {

        var topPos = $(".floatingArrow").offset().top;
        var windHeight = $( window ).height();

        if ( topPos >= windHeight ) {
            $(".floatingArrow").css({"opacity":"0.7", "right":"10px"});
            // console.log("show");
        } else {
            $(".floatingArrow").css({"opacity":"0", "right":"-50px"});
            // console.log("hide");
        }
        /* slide page on top end */
    }
}