(function($) {
  $(window).resize(function() {
    $('.main-menu').removeAttr('style');
  });

  // Mobile Menu
  $('.mobile-menu-icon').click(function() {
    $(this).toggleClass('active');
    $('header nav .main-menu').slideToggle(800);
  });

  // Set active states for the Main Menu items and their subitems
  var path = window.location.pathname;

  $(".main-menu li a").each(function() {
    var href = $(this).attr('href');
    if (path.substring(0, href.length) === href) {
      $(this).closest('a').addClass('active');
    }
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
  $('body').waypoint(function(direction) {
    var windowSize = $(window).width();

    if (direction == 'down') {
      $('header').animate({"padding":"0"}, 600);
      $('header .header-logo img').animate({"width":"10rem", "margin-top": "6px"}, 600);
      $('.main-menu li a').animate({"padding": "1.1rem 0.625rem"}, 600);
    } else {
      if (windowSize > 979) {
        $('header').animate({"padding":"2rem 0"}, 600);
        $('header .header-logo img').animate({"width":"13rem"}, 600);
        $('.main-menu li a').animate({"padding": "3.125rem 0.625rem"}, 600);
      } else {
        $('header').animate({"padding":"0.5rem"}, 600);
        $('header .header-logo img').animate({"width":"13rem", "margin-top": "0"}, 600);
      }
    }
  }, { offset: '50px' });

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

  $('#blog-filter').chosen({
    disable_search: true
  });

  $("#blog-filter").change(function(evt, params) {
    if (params.selected != 'all') {
      window.location.replace('/blog/' + params.selected);
    } else {
      window.location.replace('/blog/');
    }
  });

  var blogType = window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop();
  if (blogType == 'blog') {
    blogType = 'all';
  }
  $('#blog-filter').val(blogType).trigger("chosen:updated");


})(jQuery);
