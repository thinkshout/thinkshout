(function($) {
  $('.mobile-menu-icon').click(function() {
    $('header nav .main-menu').slideToggle(800);
    $(this).find('.fa').toggleClass('fa-bars fa-remove');
  });

  // Waypoints
  $('.case-study').each(function() {
    var current_item = $(this);
    $(this).waypoint(function(direction) {
      if (direction == 'down') {
        current_item.addClass('active');
      } else {
        current_item.removeClass('active');
      }
    }, { offset: '25%' });
  });

// Navbar animation
  $('header').waypoint(function(direction) {
    if (direction == 'down') {
      $('header').animate({"padding":"0"}, 600);
      $('header .header-logo img').animate({"width":"10rem", "margin-top": "6px"}, 600);
      $('.main-menu li').css({"padding": "1.1rem 0"});
    } else {
      $('header').animate({"padding":"2rem 0"}, 600);
      $('header .header-logo img').animate({"width":"13rem"}, 600);
      $('.main-menu li').css({"padding": "3.125rem 0"});
    }
  }, { offset: '-10%' });

  // Blog posts
  $('.post').matchHeight();
  $('.blogs-toggle').click(function() {
    $('.post:nth-child(-n+3)').css({ display: "none" });
    $('.post').slideToggle(800);
    $('.post').css({ display: "inline-block"});

    $('body, html').animate({
      scrollTop: $('.team-member-blog' ).offset().top - 70
    }, 800, function() {
    // Animation complete.
      $('.post').matchHeight();
    });

    $('.see-all-blogs').toggle();
    $('.view-less-blogs').toggle();
  });

    // $('.case-study').waypoint(function(direction) {
    //   if (direction == 'down') {
    //     $('.case-study:nth-of-type(1)').addClass('active');
    //
    //     setTimeout(function() {
    //       $('.case-study:nth-of-type(2)').addClass('active');
    //     }, 800);
    //
    //     setTimeout(function() {
    //       $('.case-study:nth-of-type(3)').addClass('active');
    //     }, 1200);
    //   } else {
    //       $('.case-study').removeClass('active');
    //   }
    // }, { offset: '25%' });
})(jQuery);
