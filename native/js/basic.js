$(function() {

  var $m_btn = $("#m_btn"),
      $m_menu = $("#m_menu"),
      $menu = $("#menu"),
      $window = $(window);

  if (navigator.userAgent.indexOf("Firefox") != -1) {
    $('header').animate({
      'border-spacing': 50
    }, {
      step: function(now, fx) {
        $(fx.elem).css("background-position", "50% " + now + "%");
      },
      duration: 2000
    });
  } else {
    $("header").animate({
      backgroundPositionY: "100%"
    }, 2000);
  }


  // show menu smoothly
  setTimeout(function() {
    $menu.animate({
      "opacity": "1",
      "top": "80px"
    }, 1000, "easeOutQuint");
  }, 1000);



  // show sidebar whem user clicks mobile menu 
  $m_btn.on('click', function() {
    $m_menu
      .sidebar('setting', 'transition', 'push')
      .sidebar("toggle");
  });


  // hide sidebar menu when screen > 768px
  $window.on('resize', function() {
    var winW = $window.width();
    if (winW > 768) {
      $m_menu.sidebar("hide");
    }
  });

  // make main menu sticky on the top when scrolling
  $menu.each(function() {
    var menuOffsetTop = $menu.offset().top;

    $window.on('scroll', $.throttle(1000 / 15, function() {
      if ($window.scrollTop() > menuOffsetTop + 80) {
        $menu.addClass('inverted').removeClass("secondary").css({
          "position": 'fixed',
          "top": '0px'
        });
      } else {
        $menu.removeClass('inverted').addClass("secondary").css({
          "position": 'absolute',
          "top": '80px'
        });
      }
    }));
  });

  // make menu item active when been clicked
  $(".menu .item").on('click', function(event) {
    event.preventDefault();
    $(".menu .item").removeClass('active');
    $(this).addClass('active');
  });
  
  
});